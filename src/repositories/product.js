const HTTPError = require('../errors/httpError');
const Product = require('../models/product');

const productRepository = {
  async save(product) {
    const exists = await this.findBySKU({ SKU: product.SKU });
    if (exists) {
      throw new HTTPError('SKU already taken', 409);
    }
    await this.doSave({ SKU: product.SKU, name: product.name });
    return product;
  },
  async findBySKU({ SKU }) {
    return Product.findOne({ SKU });
  },
  // private
  async doSave({ SKU, name }) {
    const newProduct = new Product({ SKU, name });
    return newProduct.save();
  },
};

module.exports = { productRepository };
