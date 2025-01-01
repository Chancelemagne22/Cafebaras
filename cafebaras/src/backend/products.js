import express from 'express';
import supabase from './supabasehandler.js';
import bodyParser from 'body-parser';

const products = express.Router();
products.use(bodyParser.json())
console.log('Products')

products.get('/products', async (req, res)=>{
    try{
        const {data, error} = await supabase
        .from('productsV4')
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

export default products