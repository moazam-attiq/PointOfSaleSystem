const mongoose = require("mongoose");

const RefundSchema = new mongoose.Schema({
  refundId: { type: String, required: true, unique: true },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  refundedItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalRefundAmount: { type: Number, required: true },
  refundDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Refund", RefundSchema);
