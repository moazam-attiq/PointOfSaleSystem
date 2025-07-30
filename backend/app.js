const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Optional root route
app.get('/', (req, res) => {
  res.send('POS backend running...');
});

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/refunds', require('./routes/refundRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


module.exports = app;
