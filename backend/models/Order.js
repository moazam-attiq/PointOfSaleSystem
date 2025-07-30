const mongoose = require('mongoose'); 

const OrderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    products: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
      quantity: { type: Number, required: true },
      priceAtPurchase: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    amountReceived: { type: Number, required: true },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
    createdAt: { type: Date, default: Date.now }
  });
module.exports = mongoose.model('Order', OrderSchema);
