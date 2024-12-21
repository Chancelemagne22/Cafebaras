import express from 'express';
import supabase from './supabasehandler.js';
import bodyParser from 'body-parser';

const stocks = express.Router();
stocks.use(bodyParser.urlencoded({extended:true}))
stocks.use(bodyParser.json())
console.log('Check stock')

stocks.get('/stocks', async (req, res)=>{
    try{
        const {data, error} = await supabase
        .from('inventoryV2')
        .select('*')

        if(error) {
            return res.status(500).json({error: 'Failed to fetch stocks'})
        }
        res.json(data)

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
})

stocks.post('/stocks/supplier' , async(req, res)=>{
    // supID request from frontend
    const {supID} = req.body;
    if(!supID){
        return res.status(500).json({error: 'supID is required'})

    }
    try{
        const { data , error } = await supabase
            .from('suppliers')
            .select('*')
            .eq('supplierID', supID )
            .single();
        if(error) {
            return res.status(500).json({error: 'Failed to fetch stocks'})
        }
        res.json(data)
        console.log(data + "line 43")
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
})

stocks.post('/stocks/resupply', async(req, res)=>{
    const { orderDate, item, supplier, quantity, price } = req.body;

    if(!orderDate || !item || !supplier || !quantity || !price){
        return res.status(400).json({ error: 'Data is not complete. Please provide all required fields.' });
    }
    try{
        const { error } = await supabase
        .from('resupply')
        .insert([{ orderDate, item, supplier, quantity, price }]);

        if (error) {
            console.error("Error Resupply:", error);
            return res.status(400).json({
                error: 'Ordering Resupply failed.',
                details: error.message,
            });
        }
    }catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }

});
export default stocks