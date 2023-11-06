const Product = require('../../../src/domain/src/product');

describe('Product Domain class', () => {
  let SKU;
  let name;
  let product;

  beforeEach(() => {
    SKU = 'SKU';
    name = 'product name';
  })

  const subject = () => new Product({ SKU, name });

  it('creates a new product', () => {
    product = subject();

    expect(product).not.toBeUndefined();
    expect(product.SKU).toEqual(SKU);
    expect(product.name).toEqual(name);
  });

  it('returns an Error if SKU is not given', () => {
    SKU = undefined;

    expect(subject).toThrow('Insufficient product arguments: SKU');
  });

  it('returns an Error if name is not given', () => {
    name = undefined;

    expect(subject).toThrow('Insufficient product arguments: name');
  });
});
