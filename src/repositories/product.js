const Product = require('../models/product');

const productRepository = {
  async save({ SKU, name }) {
    const newProduct = new Product({ SKU, name });
    return newProduct.save();
  },
  async findBySKU({ SKU }) {
    return Product.findOne({ SKU });
  },
};

module.exports = { productRepository };
