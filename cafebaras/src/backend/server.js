import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js'; 
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());


// Test if the server is running
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Routes - Make sure `authRoutes` is being correctly imported
app.use('/api', authRoutes);

// Adding a test POST route for /api/signup
app.post('/signup', (req, res) => {
    res.send("This is a POST request for signup!");
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
