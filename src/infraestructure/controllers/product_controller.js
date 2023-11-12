class ProductController {
  constructor({ createProductUseCase, mapProductToResponse, mapRequestToProduct }) {
    this.createProductUseCase = createProductUseCase;
    this.mapProductToResponse = mapProductToResponse;
    this.mapRequestToProduct = mapRequestToProduct;
  }

  async create(req, res) {
    const product = await this.createProductUseCase
      .execute(this.mapRequestToProduct(req.body), req.logger);

    return res.status(200).send({
      message: 'Product successfully created',
      product: this.mapProductToResponse(product),
    });
  }
}

module.exports = ProductController;
