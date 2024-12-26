import express from 'express';
import supabase from './supabasehandler.js';
import bodyParser from 'body-parser';

const router = express.Router();

router.post('/signup', async (req, res)=>{
    const {userId,username, password} = req.body;


    try{
        const {error} = await supabase
        .from('users')
        .insert([{userId, username, password}])

        if (error){
            return res.status(400).json({ error: 'Account creation failed', details: error.message });
        }
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }

});

router.post('/login', async (req, res)=>{
    const {userID, username, password} = req.body

    try{
        const {data, error} = await supabase
        .from('users')
        .select('*')
        .eq('userId', userID)
        .eq('username', username)
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
    const {username, password} = req.body;


    try{
        const {error} = await supabase
        .from('users')
        .update([{username, password}])

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
        .from('users')
        .select('*')
        .eq('username', username)
        // .eq('password', password)
        .single();

        if (error) {
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

router.put('/settings/update', async (req, res)=>{
    const {userID, username, password} = req.body;

    if (!userID || !username || !password){
        return res.status(400).json({error: 'the data is missing'});
    }

    try{
        const {data, error} = await supabase
        .from('users')
        .update({
            username,
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
