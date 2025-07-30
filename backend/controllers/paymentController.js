const Payment = require("../models/Payment");

const createPayment = async (req, res) => {
  try {
    const { orderId, customerName, mobileNumber, billAmount, amountReceived } = req.body;

    const changeGiven = amountReceived - billAmount;

    const newPayment = new Payment({
      orderId,
      customerName,
      mobileNumber,
      billAmount,
      amountReceived,
      changeGiven,
    });

    await newPayment.save();
    res.status(201).json({ message: "Payment recorded successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("orderId");
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPaymentByOrderId = async (req, res) => {
  try {
    const payment = await Payment.findOne({ orderId: req.params.orderId });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPayment, getAllPayments, getPaymentByOrderId };
