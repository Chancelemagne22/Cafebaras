import express from 'express';
import supabase from './supabasehandler.js';
import bodyParser from 'body-parser';

const products = express.Router();
products.use(bodyParser.json())
console.log('Products')

products.get('/products', async (req, res)=>{
    try{
        const {data, error} = await supabase
        .from('productsV5')
        .select('*')

        if(error) {
            return res.status(500).json({error: 'Failed to fetch orders'})
        }
        res.json(data)

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
})

products.post('/products/details', async (req, res) => {
    const transactions = req.body; // Expecting an array of transactions
    console.log(transactions)

    // Validate that it's an array and not empty
    if (!Array.isArray(transactions) || transactions.length === 0) {
        return res.status(400).json({ error: 'No transactions provided.' });
    }

    // Validate each transaction
    const invalidTransactions = transactions.filter(transaction =>
        !transaction.date || !transaction.productName ||
        !transaction.month || !transaction.week || !transaction.day || !transaction.size || !transaction.transactionID
    );

    if (invalidTransactions.length > 0) {
        return res.status(400).json({ 
            error: 'Some transactions are incomplete.', 
            invalidTransactions 
        });
    }

    try {
        const { error } = await supabase
            .from('transactions')
            .insert(transactions); // Insert the entire array

        if (error) {
            console.error('Error Transaction:', error);
            return res.status(400).json({
                error: 'Transaction failed.',
                details: error.message,
            });
        }

        return res.status(201).json({ message: 'Transactions successful!' });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


products.post('/products/receipt-record', async (req, res) => {
    const {transactionID, paymentMethod, payment, change} = req.body;

    if(!transactionID || !paymentMethod || !payment || !change){
        return res.status(400).json({ error: 'Data is not complete. Please provide all required fields.' });
    }

    try{
        const {error} = await supabase
        .from('receiptRecords')
        .insert([{transactionID, paymentMethod, payment, change}]);

        if(error) {
            console.error('Error Receipt Record:', error);
            return res.status(400).json({
                error: 'Receipt Record failed.',
                details: error.message,
            });
        }
        

        return res.status(201).json({ message: 'Receipt successful!' });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }

})
products.get('/products/whyy', async (req, res) => {

    try{
        const {data, error} = await supabase
        .from('inventoryV2')
        .select('*')

        if(error) {
            return res.status(500).json({error: 'Failed to fetch orders'})
        }
        res.json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
})

products.put('/products/update-quantities', async (req, res) => {
    console.log('Endpoint hit');

    const updates = req.body; // Expecting an object with ItemName as keys and quantities as values
    console.log('Updates received:', updates);

    // Validate the updates object
    if (!updates || typeof updates !== 'object' || Object.keys(updates).length === 0) {
        console.error('Invalid updates object');
        return res.status(400).json({ error: 'Invalid or empty updates object. Please provide valid product data.' });
    }

    try {
        const results = await Promise.all(
            Object.entries(updates).map(async ([ItemName, decrementBy]) => {
                const normalizedItemName = ItemName.trim();
                console.log(`Processing item: "${normalizedItemName}", decrementBy: ${decrementBy}`);

                if (!normalizedItemName || decrementBy == null) {
                    throw new Error(`Invalid data for item: "${normalizedItemName}"`);
                }

                // Fetch current data from Supabase
                const { data: currentData, error: fetchError } = await supabase
                    .from('inventoryV2')
                    .select('Stocked_Units, Used_Units')
                    .eq('ItemName', normalizedItemName);

                console.log(`Fetched data for ${normalizedItemName}:`, currentData);

                if (fetchError) {
                    console.error(`Error fetching data for "${normalizedItemName}":`, fetchError.message);
                    throw new Error(`Supabase fetch error for "${normalizedItemName}": ${fetchError.message}`);
                }

                if (!currentData || currentData.length === 0) {
                    throw new Error(`No data found for item: "${normalizedItemName}"`);
                }

                const currentStock = currentData[0].Stocked_Units;
                const currentUsed = currentData[0].Used_Units;

                const updatedStock = currentStock - decrementBy;
                const updatedUsedStocks = currentUsed + decrementBy;

                console.log(
                    `Updating "${normalizedItemName}": Stocked_Units from ${currentStock} to ${updatedStock}, Used_Units to ${updatedUsedStocks}`
                );

                // Update data in Supabase
                const { data: updatedData, error: updateError } = await supabase
                    .from('inventoryV2')
                    .update({
                        Stocked_Units: updatedStock,
                        Used_Units: updatedUsedStocks,
                    })
                    .ilike('ItemName', normalizedItemName);

                if (updateError) {
                    console.error(`Error updating item "${normalizedItemName}":`, updateError.message);
                    throw new Error(`Supabase update error for "${normalizedItemName}": ${updateError.message}`);
                }

                return updatedData;
            })
        );

        console.log('Update results:', results);
        return res.status(200).json({ message: 'Quantities updated successfully.', results });
    } catch (err) {
        console.error('Error during processing:', err.message);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});


export default products