import express from 'express';
import supabase from './supabasehandler.js';
import bodyParser from 'body-parser';

const router = express.Router();

router.post('/signup', async (req, res)=>{
    const {userId,password} = req.body;


    try{
        const {error} = await supabase
        .from('usersV2')
        .insert([{userId, password}])

        if (error){
            return res.status(400).json({ error: 'Account creation failed', details: error.message });
        }
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }

});

router.post('/login', async (req, res)=>{
    const {userID, password} = req.body

    try{
        const {data, error} = await supabase
        .from('usersV2')
        .select('*')
        .eq('userId', userID)
        .eq('password', password)
        .single();

        if (error || !data) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        return res.status(200).json({ success: true, uuid: data.uuid });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
    
})

router.post('/settings', async (req, res)=>{
    const {password} = req.body;


    try{
        const {error} = await supabase
        .from('users')
        .update([{password}])

        if (error){
            return res.status(400).json({ error: 'Account update failed', details: error.message });
        }
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }

});

router.use(bodyParser.json())
console.log('check')

router.get('/api/settings', async (req, res)=>{
    try{
        const {data, error} = await supabase
        .from('usersV2')
        .select('*')
        .eq('userId', userID)
        // .eq('password', password)
        .single();

        if (error){
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: 'Failed to fetch users', details: error });
        }

        if (!data) {
            return res.status(404).json({ error: 'users not found' });
        }

        res.status(200).json({ product: data });


    }catch(err){
        console.error('Unexpected error:', err)
        res.status(500).json({error:'Internal server error?'})
    }
})

router.use(bodyParser.json())
console.log('check')



router.put('/settings/update', async (req, res)=>{
    const {userID,password} = req.body;

    if (!userID || !password){
        return res.status(400).json({error: 'the data is missing'});
    }

    try{
        const {data, error} = await supabase
        .from('usersV2')
        .update({
            password
        })
        .eq('userId', userID)
        .single();

        if (error) {
            console.error('Error updating users:', error);
            return res.status(500).json({ error: 'Failed to update users', details: error });
          }
      
        if (!data) {
        return res.status(404).json({ error: 'User not found' });
        }
      
          res.status(200).json({ message: 'User updated successfully', user: data });
        } catch (err) {
          console.error('Unexpected error:', err);
          res.status(500).json({ error: 'Internal server error' });
        }

});

export default router;
