const HTTPError = require('../errors/httpError');

const createProduct = async ({
  SKU, name, productRepository, logger,
}) => {
  logger.log(`Product service - create method - SKU: ${SKU}`);

  const exists = await productRepository.findBySKU({ SKU });
  if (exists) {
    throw new HTTPError('SKU already taken', 409);
  }

  const product = await productRepository.save({ SKU, name });
  logger.log(`New product created with SKU: ${SKU}`);
  return product;
};

module.exports = { createProduct };
