// backend/controllers/productController.js

const Product = require("../models/Inventory");
const Order = require("../models/Order");
const path = require("path");
const fs = require("fs").promises; // use promises version for await

const createProduct = async (req, res) => {
  try {
    const { productName, originalPrice, resalePrice, stockQuantity } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const product = new Product({
      productName,
      originalPrice,
      resalePrice,
      stockQuantity,
      image: imageUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getInventoryStats = async (req, res) => {
  try {
    const products = await Product.find();
    const orders = await Order.find();

    const result = products.map((product) => {
      let sold = 0;
      let earnings = 0;

      orders.forEach((order) => {
        order.cartItems.forEach((item) => {
          if (item.productId.toString() === product._id.toString()) {
            sold += item.quantity;
            earnings += item.quantity * item.resalePrice;
          }
        });
      });

      const profit = earnings - sold * product.originalPrice;

      return {
        _id: product._id,
        name: product.productName,
        original: product.originalPrice,
        resale: product.resalePrice,
        sold,
        earnings,
        stock: product.stockQuantity,
        profit,
        image: product.image,
      };
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: err.message });
  }
};

const updateProductById = async (req, res) => {
  const { productName, originalPrice, resalePrice, stock } = req.body;

  try {
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update editable fields
    existingProduct.productName = productName || existingProduct.name;
    existingProduct.originalPrice =
      originalPrice ?? existingProduct.originalPrice;
    existingProduct.resalePrice = resalePrice ?? existingProduct.resalePrice;
    if (stock && !isNaN(stock)) {
      existingProduct.stockQuantity += Number(stock);
    } else {
      console.warn("⚠️ Skipping stock update: Invalid or missing stock field");
    }

    const updated = await existingProduct.save();
    res.status(200).json({ message: "Product updated", product: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating product", error: err.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (deleted.image) {
      const fileName = path.basename(deleted.image); // ensures just the file name
      const imagePath = path.join(__dirname, "..", "uploads", fileName); // backend/uploads

      try {
        await fs.unlink(imagePath);
        console.log("🗑️ Image deleted:", imagePath);
      } catch (err) {
        console.error("⚠️ Failed to delete image:", err.message);
        // don't return error here, just log
      }
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
};


const getInventoryStatus = async (req, res) => {
  try {
    const products = await Product.find();

    const mapped = products.map((p) => ({
      _id: p._id,
      productName: p.productName,
      resalePrice: p.resalePrice,
      stock: p.stockQuantity,
      image: p.image,
    }));

    res.status(200).json(mapped);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch inventory",
      error: error.message,
    });
  }
};




module.exports = {
  createProduct,
  getAllProducts,
  getInventoryStats,
  getProductById,
  updateProductById,
  deleteProductById,
  getInventoryStatus,
};
