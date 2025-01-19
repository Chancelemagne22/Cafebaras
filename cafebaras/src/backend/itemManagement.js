import express from 'express';
import supabase from './supabasehandler.js';
import bodyParser from 'body-parser';
console.log('Check Item management')

const fetchInventory = express.Router();
fetchInventory.use(bodyParser.json())

fetchInventory.get('/items/inventory', async(req, res) =>{
    try{
        const {data, error} = await supabase
        .from('inventoryV2')
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

fetchInventory.get('/items/product', async (req, res) => {
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