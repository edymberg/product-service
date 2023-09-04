const { asyncHandler } = require('../../middlewares/asyncHandler');

const registerProductRoutes = (router, application) => {
  router
    .route('/product')
    .post(asyncHandler(async (req, res) => {
      const { SKU, name } = req.body;
      const product = await application.productService.createProduct({
        SKU, name, ...application, logger: req.logger,
      });
      return res
        .status(200)
        .send({
          message: 'Product successfully created',
          productSKU: product.SKU,
        });
    }));
};

module.exports = { registerProductRoutes };
