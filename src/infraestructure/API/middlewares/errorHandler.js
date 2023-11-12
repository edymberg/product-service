const ExistingProductException = require('../../../domain/errors/existing_product_exception');
const InsufficientProductArgsException = require('../../../domain/errors/insufficient_product_args_exception');

const errorHandler = (error, req, res, next) => {
  if (error instanceof ExistingProductException) {
    req.logger.log(`Status code: 409 - ${error.stack}`);
    res.status(409);
    res.json({
      message: error.message,
    });
  }
  if (error instanceof InsufficientProductArgsException) {
    req.logger.log(`Status code: 422 - ${error.stack}`);
    res.status(422);
    res.json({
      message: error.message,
    });
  } else {
    req.logger.log(`Status code: 500 - ${error.stack}`);
    res.status(500);
    res.json({
      message: 'Oops! Something failed, please try again later',
    });
  }
  next();
};

module.exports = { errorHandler };
