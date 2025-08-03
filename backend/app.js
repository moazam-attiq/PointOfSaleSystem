const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // useful for form data

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('✅ POS backend running...');
});

// ✅ API Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/refunds', require('./routes/refundRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// ✅ Static Assets (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/defaults', express.static(path.join(__dirname, '..', 'public', 'defaults')));

// ✅ 404 fallback (optional)
app.use((req, res, next) => {
  res.status(404).json({ message: '❌ Route not found' });
});

module.exports = app;
