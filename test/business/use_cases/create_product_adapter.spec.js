const { restoreMocks } = require('../../restoreMocks');
const CreateProduct = require('../../../src/business/use_cases/create_product');
const Product = require('../../../src/domain/src/product');

describe('Create Product Use Case', () => {
  let useCase;
  let saveSpy;
  let SKU = 'SKU';
  let name = 'product name';
  const product = new Product({ SKU, name })
  const productRepository = {
    save: () => Promise.resolve(product),
  };

  beforeEach(() => {
    // Mock console.log to do nothing:
    require('../../loggerMock');

    saveSpy = jest.spyOn(productRepository, 'save');
    useCase = new CreateProduct({ productRepository });
  });

  afterEach(() => {
    restoreMocks();
  });

  const subject = async () => useCase.execute(product, console);

  it('saves a new product', async () => {
    const product = await subject();

    expect(saveSpy).toHaveBeenCalled();
    expect(product).not.toBeUndefined();
    expect(product.SKU).toEqual(SKU);
    expect(product.name).toEqual(name);
  });

  it('returns an Error if saving product throws unexpected error', async () => {
    saveSpy = jest
      .spyOn(productRepository, 'save')
      .mockImplementation(() => 
        Promise.reject(new Error('Unexpected error while saving!'))
      );

    await expect(subject()).rejects
      .toThrow('Unexpected error while saving!');
    expect(saveSpy).toHaveBeenCalled();
  });
});
