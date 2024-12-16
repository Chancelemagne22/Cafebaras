import express from 'express';
import supabase from './supabasehandler.js';
import bodyParser from 'body-parser';
console.log('Check Item management')

const fetchInventory = express.Router();
fetchInventory.use(bodyParser.json())

fetchInventory.get('/items', async(req, res) =>{
    try{
        const {data, error} = await supabase
        .from('inventory')
        .select('*')

        if(error){
            return res.status(500).json({error: 'Failed to fetch inventory'})
        }
        res.json(data)
    
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal server error'})
    }

})

fetchInventory.get('/items', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
  
      if (error) {
        return res.status(500).json({ error: 'Failed to fetch products' });
      }
  
      res.json(data)
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Internal server error' })
    }
})

export default fetchInventory;