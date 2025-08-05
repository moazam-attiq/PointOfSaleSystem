const Order = require("../models/Order");
const Product = require("../models/Inventory");

// Helper: Generate a unique order number
const generateOrderNumber = () => {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, ""); // e.g., 20250730
  const timePart = now.getTime().toString().slice(-5); // last 5 digits of timestamp
  return `ORD-${datePart}-${timePart}`;
};

const createOrder = async (req, res) => {
  try {
    const { cartItems, totalAmount } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    // Sanitize and prepare cart items
    const cleanedItems = cartItems.map((item) => ({
      productId: item._id,
      productName: item.productName,
      resalePrice: item.resalePrice,
      quantity: item.quantity,
      image: item.image,
    }));

    const newOrder = new Order({
      orderNumber: generateOrderNumber(),
      cartItems: cleanedItems,
      totalAmount,
      date: new Date(),
    });

    const savedOrder = await newOrder.save();

    for (const item of cleanedItems) {
      const product = await Product.findById(item.productId);

      if (!product) {
        console.warn(`⚠️ Product not found: ${item.productId}`);
        continue;
      }

      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.productName}. Available: ${product.stock}, Requested: ${item.quantity}`,
        });
      }

      product.stockQuantity -= item.quantity;
      await product.save();
    }

    // Send back order ID to use for payments
    res.status(201).json({
      message: "Order placed successfully.",
      orderId: savedOrder._id,
    });
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("cartItems.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, getAllOrders, getOrderById };
