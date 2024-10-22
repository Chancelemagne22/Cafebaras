import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import supabase from '../supabaseHandler.js';

const router = express.Router();

// POST request to handle sign-up
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    console.log("Received signup request:", username, password); // Log the incoming request

    // Create a unique ID
    const userId = uuidv4();

    // Insert the user into Supabase
    const { error } = await supabase
        .from('users')
        .insert([{ userId, username, password }]);

    if (error) {
        console.error("Error creating account:", error);
        return res.status(400).json({ error: 'Account creation failed.', details: error.message });
    }

    res.json({ success: true });
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log("Received login request:", username);

    // Authenticate user with Supabase
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password) 
        .single();

    if (error) {
        console.error("Error logging in:", error);
        return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }

    // If the user is found
    res.json({ success: true, userId: data.userId });
});


// Export the router
export default router;
