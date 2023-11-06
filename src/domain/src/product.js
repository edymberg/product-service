const InsufficientProductArgsException = require('../errors/insufficient_product_args_exception');

class Product {
  constructor({ SKU, name }) {
    this.SKU = SKU;
    this.validateSKU();
    this.name = name;
    this.validateName();
  }

  validateSKU() {
    if (!this.SKU) {
      throw new InsufficientProductArgsException('SKU');
    }
  }

  validateName() {
    if (!this.name) {
      throw new InsufficientProductArgsException('name');
    }
  }
}

module.exports = Product;
