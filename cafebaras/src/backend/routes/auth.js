import express from 'express';
import supabase from '../supabaseHandler.js';
import createId from '../idHandler.js'

const router = express.Router();

// POST request to handle sign-up
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    console.log("Received signup request:", username, password); // Log the incoming request

    // Create a unique ID
    const userId = createId();
    console.log(userId);


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
    const { userId, username, password } = req.body;
    console.log("Received login request:", username);

    // Authenticate user with Supabase
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('userId', userId)
        .eq('username', username)
        .eq('password', password) 
        .single();
    if (error) {
        console.error("Error logging in:", error);
        return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }

    // If the user is found
    res.json({ success: true, uuid: data.uuid });
});
router.post('/SalesManagement', async (req, res) => {
    const { productID, productName, price } = req.body;

    console.log("Received signup request:", productID, productName, price ); // Log the incoming request

    // Create other info
    const date = new Date();

    // Insert the user into Supabase
    const { error } = await supabase
        .from('transactions')
        .insert([{ date, productID, productName, price }]);

    if (error) {
        console.error("Error creating account:", error);
        return res.status(400).json({ error: 'Transactions failed.', details: error.message });
    }

    res.json({ success: true });    
});
// Export the router
export default router;
