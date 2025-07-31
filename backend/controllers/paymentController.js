const Payment = require("../models/Payment");
const Order = require("../models/Order");

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

const getSalesRecord = async (req, res) => {
  try {
    const orders = await Order.find();
    const payments = await Payment.find();

    const merged = orders.map(order => {
      const payment = payments.find(p => p.orderId.toString() === order._id.toString());

      const due = payment ? payment.amountReceived - payment.billAmount : 0;
      const change = payment?.amountReceived - payment?.billAmount;

      return {
        orderId: order._id,
        orderNumber: order.orderNumber,
        date: payment?.paymentDate.toLocaleDateString() || "N/A",
        customerName: payment?.customerName || "N/A",
        contact: payment?.mobileNumber || "N/A",
        totalAmount: payment?.billAmount || 0,
        paidAmount: payment?.amountReceived || 0,
        due: Math.abs(due),
        change: change || 0,
      };
    });

    res.json(merged);
  } catch (error) {
    console.error("❌ getSalesRecord error:", error.message);
    res.status(500).json({ message: "Failed to get sales record", error: error.message });
  }
};


module.exports = { createPayment, getAllPayments, getPaymentByOrderId, getSalesRecord };
