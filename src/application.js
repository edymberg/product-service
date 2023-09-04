const config = require('./config');
const { connectDB } = require('./database/connection');
const { productRepository } = require('./repositories/product');
const productService = require('./services/product');
const loggerFactory = require('./logger');

const testApp = () => ({
  loggerFactory,
  productRepository,
  productService,
});

const prodApp = () => {
  connectDB(config.DB_URL);

  return {
    loggerFactory,
    productRepository,
    productService,
  };
};

const createApp = () => (
  config.NODE_ENV === 'test' ? testApp() : prodApp()
);

module.exports = { application: createApp() };
