const { restoreMocks } = require('../restoreMocks');
const { createProduct } = require('../../src/services/product');
const { productRepository } = require('../../src/repositories/product');
const Product = require('../../src/domain/product');

describe('Product service test', () => {
  let saveSpy;
  let doSaveSpy;
  let findBySKUSpy;
  let SKU = 'SKU';
  let name = 'product name';

  beforeEach(() => {
    // Mock console.log to do nothing:
    require('../loggerMock');

    saveSpy = jest.spyOn(productRepository, 'save');
    doSaveSpy = jest.spyOn(productRepository, 'doSave').mockImplementation(() => {});
    findBySKUSpy = jest.spyOn(productRepository, 'findBySKU').mockImplementation(() => {});
  });

  afterEach(() => {
    restoreMocks();
  });

  const subject = async () => {
    await createProduct({
      product: new Product({ SKU, name }),
      productRepository,
      logger: console
    });
  };

  it('should save product', async () => {
    await subject();

    expect(saveSpy).toHaveBeenCalled();
    expect(findBySKUSpy).toHaveBeenCalled();
    expect(doSaveSpy).toHaveBeenCalled();
  });

  it('should return 204 status with message if SKU is already taken', async () => {
    findBySKUSpy = jest
      .spyOn(productRepository, 'findBySKU')
      .mockImplementation(() => Promise.resolve({ SKU }));

    await expect(subject()).rejects.toThrow('SKU already taken');

    expect(saveSpy).toHaveBeenCalled();
    expect(findBySKUSpy).toHaveBeenCalled();
    expect(doSaveSpy).not.toHaveBeenCalled();
  });

  it('should return 204 status with message if saving product fails', async () => {
    saveSpy = jest
      .spyOn(productRepository, 'doSave')
      .mockImplementation(() => {
        throw new Error('Error while saving!');
      });

    await expect(subject()).rejects.toThrow('Error while saving!');

    expect(saveSpy).toHaveBeenCalled();
    expect(findBySKUSpy).toHaveBeenCalled();
    expect(doSaveSpy).toHaveBeenCalled();
  });
});
