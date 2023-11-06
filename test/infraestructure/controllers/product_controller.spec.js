const { restoreMocks } = require('../../restoreMocks');
const ProductController = require('../../../src/infraestructure/controllers/product_controller');
const { mapProductToResponse, mapRequestToProduct } = require('../../../src/infraestructure/controllers/mappers/productMapper');

describe('ProductController', () => {
  let productController;
  let SKU = 'SKU';
  let name = 'product name';
  let req;
  let res;
  let createProductUseCase;

  beforeEach(() => {
    req = {
      body: {
        SKU,
        name,
      }
    };
    res = {
      code: undefined,
      status(code) {
        code = code;
        return this;
      },
      send(object) {
        return object;
      }
    };

    executeMock = jest.fn(product => Promise.resolve(product));
    createProductUseCase = { execute: executeMock };

    productController = new ProductController({
      createProductUseCase,
      mapProductToResponse: mapProductToResponse,
      mapRequestToProduct: mapRequestToProduct,
    });
  });

  afterEach(() => {
    restoreMocks();
  });

  const subject = async () => productController.create(req, res);

  it('calls the Use Case', async () => {
    await subject();

    expect(executeMock.mock.calls).toHaveLength(1);
  });

  it('returns a success message', async () => {
    const response = await subject();

    expect(response.message).toEqual('Product successfully created');
  });

  it('returns a ProductResponseDTO', async () => {
    const response = await subject();

    expect(response.product).toEqual({
      productSKU: SKU,
    });
  });
});
