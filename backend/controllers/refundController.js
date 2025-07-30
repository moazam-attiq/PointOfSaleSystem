const Refund = require('../models/Refund');

const createRefund = async (req, res) => {
  try {
    const refund = await Refund.create(req.body);
    res.status(201).json(refund);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find().populate('orderId').populate('refundedItems.productId');
    res.json(refunds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createRefund, getAllRefunds };
