const config = require('./config');
const { connectDB } = require('../database/connection');
const loggerFactory = require('../logger/index');
const ProductMongoRepository = require('../product_adapters/product_mongo_repository');
const ProductController = require('../controllers/product_controller');
const CreateProductUseCase = require('../../business/use_cases/create_product');
const { mapProductToResponse, mapRequestToProduct } = require('../controllers/mappers/productMapper');

const testApp = () => {
  const productRepository = new ProductMongoRepository();
  const createProductUseCase = new CreateProductUseCase({ productRepository });

  return {
    loggerFactory,
    productController: new ProductController({
      createProductUseCase,
      mapProductToResponse,
      mapRequestToProduct,
    }),
  };
};

const prodApp = () => {
  connectDB(config.DB_URL);
  const productRepository = new ProductMongoRepository();
  const createProductUseCase = new CreateProductUseCase({ productRepository });

  return {
    loggerFactory,
    productController: new ProductController({
      createProductUseCase,
      mapProductToResponse,
      mapRequestToProduct,
    }),
  };
};

const createApp = () => (
  config.NODE_ENV === 'test' ? testApp() : prodApp()
);

module.exports = { application: createApp() };
