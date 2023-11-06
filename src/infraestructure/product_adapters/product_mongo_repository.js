const mongoose = require('mongoose');
const Product = require('../../domain/src/product');
const ExistingProductException = require('../../domain/errors/existing_product_exception');
const InsufficientProductArgsException = require('../../domain/errors/insufficient_product_args_exception');
const ProductRepository = require('../../business/product_ports/product_repository_port');

const productSchema = new mongoose.Schema({
  SKU: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});
const ProductModel = mongoose.model('Product', productSchema);

const DuplicateKeyError = 11000;

class ProductMongoRepository extends ProductRepository {
  async save(product) {
    const newProduct = new ProductModel(this.mapToProductDataHolder(product));
    try {
      await newProduct.save();
    } catch (error) {
      // FROM: https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.yml#L547
      if (error.code === DuplicateKeyError) {
        throw new ExistingProductException();
      }
      if (error instanceof mongoose.Error.ValidationError) {
        throw new InsufficientProductArgsException(Object.keys(error.errors));
      }
      throw error;
    }

    return new Product({ SKU: newProduct.SKU, name: newProduct.name });
  }

  async findBySKU({ SKU }) {
    const product = await ProductModel.findOne({ SKU });
    return this.mapToProduct(product);
  }
}

module.exports = ProductMongoRepository;
