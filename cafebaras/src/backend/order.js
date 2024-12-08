import express from 'express';
import supabase from './supabasehandler.js';
import bodyParser from 'body-parser';

const orders = express.Router();
orders.use(bodyParser.json())

orders.get('/orders', async (req, res)=>{
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




export default orders;