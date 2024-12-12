import express from 'express'
import supabase from './supabasehandler.js';

import bodyParser from 'body-parser';

const inventory = express.Router();
console.log('Check')
inventory.use(bodyParser.json())

inventory.get('/inventory', async(req, res)=>{
    try{
        const {data, error} = await supabase
        .from('stocksV3')
        .select('*')

        if (error){
            return res.status(500).json({error: 'Failed to fetch inventory'})
        }
        res.json(data)

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
});

export default inventory;