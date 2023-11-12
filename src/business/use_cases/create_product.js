const CreateProductPort = require('../../domain/use_cases/create_product');

class CreateProduct extends CreateProductPort {
  async execute(product, logger) {
    logger.log(`Product service - create method - SKU: ${product.SKU}`);
    const savedProduct = await this.productRepository.save(product);
    logger.log(`New product created with SKU: ${savedProduct.SKU}`);

    return savedProduct;
  }
}

module.exports = CreateProduct;
