import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './auth.js'; 
import transactionRoutes from './transaction.js';
import ordersRoutes from './order.js'
import inventoryRoutes from './inventory.js'
import itemsRoutes from './itemManagement.js'
import stocksRoutes from './stock.js'
import productsRoutes from './products.js'
console.log('Check')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoutes); 
app.use('/api', transactionRoutes);
app.use('/api', ordersRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', itemsRoutes)
app.use('/api', stocksRoutes)
app.use('/api', productsRoutes)

// Test route to check if server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
