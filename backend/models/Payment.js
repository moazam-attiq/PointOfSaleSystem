const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  billAmount: { type: Number, required: true },
  amountReceived: { type: Number, required: true },
  changeGiven: { type: Number, default: 0 },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Payment", PaymentSchema);
