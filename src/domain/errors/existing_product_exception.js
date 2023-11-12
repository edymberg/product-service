class ExistingProductException extends Error {
  constructor() {
    super('SKU already taken');
  }
}

module.exports = ExistingProductException;
