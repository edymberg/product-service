const express = require('express');
const { registerProductRoutes } = require('./products');

const initV1 = (application) => {
  const router = express.Router();
  registerProductRoutes({ router, productController: application.productController });
  return router;
};

module.exports = { initV1 };
