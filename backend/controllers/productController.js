// backend/controllers/productController.js

const Product = require('../models/Inventory');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { productName, originalPrice, resalePrice, stockQuantity } = req.body;

    const product = new Product({
      productName,
      originalPrice,
      resalePrice,
      stockQuantity
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts
};
