const { restoreMocks } = require('../restoreMocks');
const { createProduct } = require('../../src/services/product');
const { productRepository } = require('../../src/repositories/product');

describe('Product service test', () => {
  let saveSpy;
  let findBySKUSpy;
  let SKU = 'SKU';
  let name = 'product name';

  beforeEach(() => {
    // Mock console.log to do nothing:
    require('../loggerMock');

    saveSpy = jest.spyOn(productRepository, 'save').mockImplementation(() => {});
    findBySKUSpy = jest.spyOn(productRepository, 'findBySKU').mockImplementation(() => {});
  });

  afterEach(() => {
    restoreMocks();
  });

  const subject = async () => {
    await createProduct({
      SKU,
      name,
      productRepository,
      logger: console
    });
  };

  it('should save product', async () => {
    await subject();

    expect(findBySKUSpy).toHaveBeenCalled();
    expect(saveSpy).toHaveBeenCalled();
  });

  it('should return 204 status with message if SKU is already taken', async () => {
    findBySKUSpy = jest
      .spyOn(productRepository, 'findBySKU')
      .mockImplementation(() => Promise.resolve({ SKU }));

    await expect(subject()).rejects.toThrow('SKU already taken');

    expect(findBySKUSpy).toHaveBeenCalled();
    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('should return 204 status with message if saving product fails', async () => {
    saveSpy = jest
      .spyOn(productRepository, 'save')
      .mockImplementation(() => {
        throw new Error('Error while saving!');
      });

    await expect(subject()).rejects.toThrow('Error while saving!');

    expect(findBySKUSpy).toHaveBeenCalled();
    expect(saveSpy).toHaveBeenCalled();
  });
});
