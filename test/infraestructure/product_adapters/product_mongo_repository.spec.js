const { connectDB, dropDB, dropCollections } = require('../connection');
const Product = require('../../../src/domain/src/product');
const ProductMongoRepository = require('../../../src/infraestructure/product_adapters/product_mongo_repository');

describe('ProductRepository', () => {
  let productRepository = new ProductMongoRepository();
  let SKU;
  let name;

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  beforeEach(async () => {
    SKU = 'SKU';
    name = 'product name';
    await dropCollections();
  });

  const subject = async () => productRepository.save(new Product({ SKU, name }));

  it('saves a new product in the DB and returns it', async () => {
    const savedProduct = await subject();

    expect(savedProduct.SKU).toEqual(SKU);
    expect(savedProduct.name).toEqual(name);
  });

  it('should return ExistingProductException if SKU is already taken', async () => {
    await productRepository.save(new Product({ SKU, name }));

    await expect(subject()).rejects.toThrow('SKU already taken');
  });

  it('should return InsufficientProductArgsException if no name is given', async () => {
    name = undefined;

    await expect(subject()).rejects.toThrow('Insufficient product arguments: name');
  });

  it('should return InsufficientProductArgsException if no SKU is given', async () => {
    SKU = undefined;

    await expect(productRepository.save({ SKU, name })).rejects.toThrow('Insufficient product arguments: SKU');
  });

  it('should return InsufficientProductArgsException if no SKU nor name is given', async () => {
    SKU = undefined;
    name = undefined;

    await expect(productRepository.save({ SKU, name })).rejects.toThrow('Insufficient product arguments: SKU,name');
  });


  it('should return Error if saving product throws unexpected error', async () => {
    saveSpy = jest
      .spyOn(productRepository, 'save')
      .mockImplementation(() => Promise.reject(new Error('Unexpected error while saving!')));

    await expect(subject()).rejects
      .toThrow('Unexpected error while saving!');
  });
});
