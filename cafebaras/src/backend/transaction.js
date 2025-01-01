import express from 'express';
import supabase from './supabasehandler.js';
import bodyParser from 'body-parser';
console.log('Check transaction')


const transactions = express.Router();
transactions.use(bodyParser.json())

transactions.get('/transactions', async(req, res )=>{
    try{
        const {data, error} = await supabase
        .from('transactions')
        .select('*')
        .order('tID',{ascending:false});

        if(error){
            return res.status(500).json({error: 'Failed to fetch transactions'})
        }
        res.json(data)
        
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})

    }
});
transactions.post('/transactions/details', async(req,res)=>{
    const {date, productID, productName, price, month, week,day} = req.body;

    if (!date || !productID || !productName || !price || !month || !week || !day) {
        return res.status(400).json({ error: 'Data is not complete. Please provide all required fields.' });
    }
    try {
        const { error } = await supabase
            .from('transactions')
            .insert([{ date, productID, productName, price, month, week, day }]);
    
        
        return res.status(201).json({ message: 'Transaction successful!' });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
    
})

export default transactions;