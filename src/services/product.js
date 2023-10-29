const createProduct = async ({
  product, productRepository, logger,
}) => {
  logger.log(`Product service - create method - SKU: ${product.SKU}`);
  await productRepository.save(product);
  logger.log(`New product created with SKU: ${product.SKU}`);
  return product.SKU;
};

module.exports = { createProduct };
