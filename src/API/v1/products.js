const Product = require('../../domain/product');
const { asyncHandler } = require('../../middlewares/asyncHandler');

const registerProductRoutes = (router, application) => {
  router
    .route('/product')
    .post(asyncHandler(async (req, res) => {
      const product = new Product({ SKU: req.body.SKU, name: req.body.name });

      const sku = await application.productService.createProduct({
        product,
        productRepository: application.productRepository,
        logger: req.logger,
      });
      const createProductResponse = {
        message: 'Product successfully created',
        productSKU: sku,
      };

      return res.status(200).send(createProductResponse);
    }));
};

module.exports = { registerProductRoutes };
