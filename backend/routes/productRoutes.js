const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // ✅ multer middleware
const { createProduct, getAllProducts, getInventoryStats, updateProductById, getProductById, deleteProductById, getInventoryStatus } = require("../controllers/productController");

router.post("/", upload.single("productImage"), createProduct); // ✅ CORRECT USAGE
router.get("/", getAllProducts);
router.get("/inventory", getInventoryStats);
router.get("/products/inventory", getInventoryStatus);
router.get("/:id", getProductById);
router.put("/:id", updateProductById)
router.delete("/:id", deleteProductById);

module.exports = router;
