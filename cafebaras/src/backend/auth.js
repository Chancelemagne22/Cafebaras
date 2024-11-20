import express from 'express';
import supabase from './supabasehandler.js';

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


export default router;
