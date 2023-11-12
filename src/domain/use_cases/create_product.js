/* eslint-disable */
const SubclassResponsibilityException = require('../errors/subclass_responsibility_exception');

class CreateProductPort {
  /*
   * @method: new - instantiates a CreateProductUseCase.
   * @param: productRepository - a ProductRepository.
   * @param: logger - a Logger.
   */
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  /*
   * @method: execute - receives a product and saves it in the DB
   * validating no other product with that same SKU exists, 
   * otherwise returns an ExistingProductException.
   * @param: product - a domain Product.
   */
  async execute(product, logger) {
    throw new SubclassResponsibilityException();
  }
}

module.exports = CreateProductPort;
