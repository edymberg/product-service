/* eslint-disable */
const SubclassResponsibilityException = require('../../domain/errors/subclass_responsibility_exception');
const Product = require('../../domain/src/product');

class ProductRepository {
  /*
   * @method: new - instantiates a ProductRepository
   */
  constructor() {
  }

  /*
   * @method: save - receives a product and saves it to the DB.
   * @param: product - a domain Product.
   */
  async save(product) {
    throw new SubclassResponsibilityException();
  }

  /*
   * @method: findBySKU - receives a product SKU and finds it in the DB.
   * @param: SKU - a string representing the Product SKU.
   */
  async findBySKU({ SKU }) {
    throw new SubclassResponsibilityException();
  }

  /*
   * @method: mapToProductDataHolder - receives a product and maps it to a 
   * ProductDataHolder object.
   * @param: product - a domain Product.
   */
  mapToProductDataHolder(product) {
    return { SKU: product.SKU, name: product.name };
  }

  /*
   * @method: mapToProduct - receives a product Data Holder and maps it to a 
   * Product domian object.
   * @param: product - a Product Data Holder.
   */
  mapToProduct(product) {
    return new Product({ SKU: product.SKU, name: product.name });
  }
}

module.exports = ProductRepository;
