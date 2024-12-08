import express from 'express';
import supabase from './supabasehandler.js';
import bodyParser from 'body-parser';
console.log('Check')


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


export default transactions;