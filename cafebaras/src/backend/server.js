import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './auth.js'; 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes); 

// Test route to check if server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
