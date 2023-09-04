const express = require('express');
const { registerProductRoutes } = require('./products');

const initV1 = (application) => {
  const router = express.Router();
  registerProductRoutes(router, application);
  return router;
};

module.exports = { initV1 };
