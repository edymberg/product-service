const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  SKU: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
