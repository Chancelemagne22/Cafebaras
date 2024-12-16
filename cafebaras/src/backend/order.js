import express from 'express';
import supabase from './supabasehandler.js';
import bodyParser from 'body-parser';

const orders = express.Router();
orders.use(bodyParser.json())
console.log('Check order')

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



orders.post('/orders/products', async (req, res)=>{
    const { index } = req.body;
    console.log(index)

    if(!index){
        return res.status(500).json({error: 'Index is required'})
    }
    try{
        const {data, error} = await supabase
        .from('productsV4')
        .select('*')
        .eq('pID', index )
        .single();


        if (error) {
            console.error('Error fetching product:', error);
            return res.status(500).json({ error: 'Failed to fetch product', details: error });
        }

        if (!data) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ product: data });


    }catch(err){
        console.error('Unexpected error:', err)
        res.status(500).json({error:'Internal server error?'})
    }
})


export default orders;