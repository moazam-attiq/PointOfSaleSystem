const Refund = require("../models/Refund");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const Product = require("../models/Inventory");

const createRefund = async (req, res) => {
  try {
    const refund = await Refund.create(req.body);

    // Decrease inventory
    for (const item of req.body.refundedItems) {
      try {
        if (typeof item.quantity === "number" && item.quantity > 0) {
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { stockQuantity: item.quantity },
          });
        }
      } catch (invErr) {
        console.error(`Failed to update inventory for ${item._id}`, invErr);
      }
    }

    res.status(201).json(refund);
  } catch (err) {
    console.error("Refund creation error:", err); // <-- Log the error details
    res.status(500).json({ message: err.message });
  }
};

const getAllRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find()
      .populate("orderId")
      .populate("refundedItems.productId");
    res.json(refunds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchCustomer = async (req, res) => {
  const { customerName } = req.query;

  if (!customerName) {
    return res.status(400).json({ message: "Customer name required" });
  }

  try {
    // Step 1: Find matching payments
    const payments = await Payment.find({
      customerName: { $regex: customerName, $options: "i" },
    }).select("customerName orderId");

    // Step 2: For each payment, fetch the corresponding order to get the orderNumber
    const suggestions = await Promise.all(
      payments.map(async (payment) => {
        const order = await Order.findById(payment.orderId).select(
          "orderNumber"
        );
        return {
          customerName: payment.customerName,
          orderId: payment.orderId,
          orderNumber: order ? order.orderNumber : "N/A", // fallback if not found
        };
      })
    );

    res.json(suggestions);
  } catch (err) {
    console.error("Error in searchCustomer:", err);
    res.status(500).json({ message: "Error fetching suggestions" });
  }
};

// 2. Get order details by orderId
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Check if refund already exists
    const existingRefund = await Refund.findOne({ orderId });
    if (existingRefund) {
      return res.status(409).json({ message: "This order has already been refunded." });
    }
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    const payment = await Payment.findOne({orderId});
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    const response = {
      ...order.toObject(),
      mobileNumber: payment.mobileNumber,
      customerName: payment.customerName,
    };
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order" });
  }
};

const getRefundById = async (req, res) => {
  try {
    const refund = await Refund.findById(req.params.id)
      .populate("orderId")
      .populate("refundedItems.productId");

    if (!refund) return res.status(404).json({ message: "Refund not found" });

    res.json(refund);
  } catch (err) {
    console.error("Error fetching refund by ID:", err);
    res.status(500).json({ message: "Error fetching refund" });
  }
};


module.exports = { createRefund, getAllRefunds, searchCustomer, getOrderById, getRefundById };
