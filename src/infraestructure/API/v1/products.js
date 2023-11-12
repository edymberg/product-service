const { asyncHandler } = require('../middlewares/asyncHandler');

const registerProductRoutes = ({ router, productController }) => {
  router
    .route('/product')
    .post(asyncHandler(async (req, res) => productController.create(req, res)));
};

module.exports = { registerProductRoutes };
