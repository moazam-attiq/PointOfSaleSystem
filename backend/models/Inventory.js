const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  productName: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  resalePrice: { type: Number, required: true },
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

module.exports = mongoose.model('Inventory', InventorySchema);
