const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  productName: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  resalePrice: { type: Number, required: true },
  image: { type: String, required: false }, // 🆕 optional image field
  profitMargin: {
    type: Number,
    get: function () {
      return this.resalePrice - this.originalPrice;
    },
    set: function () {
      return this.resalePrice - this.originalPrice;
    }
  },
  stockQuantity: { type: Number, required: true }
});

// Enable getters in JSON output
InventorySchema.set('toJSON', { getters: true });

module.exports = mongoose.model("Product", InventorySchema, "products");
