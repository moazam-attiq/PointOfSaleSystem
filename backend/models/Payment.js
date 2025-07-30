const mongoose = require('mongoose'); 

const PaymentSchema = new mongoose.Schema({
    paymentId: { type: String, required: true, unique: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    billAmount: { type: Number, required: true },
    amountReceived: { type: Number, required: true },
    changeGiven: { type: Number, default: 0 }
  });
  module.exports = mongoose.model('Payment', PaymentSchema);
