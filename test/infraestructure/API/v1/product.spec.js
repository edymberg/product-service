const request = require('supertest');
const { connectDB, dropDB, dropCollections } = require('../../connection');
const { app } = require('../../../../src/infraestructure/app');
const ProductMongoRepository = require('../../../../src/infraestructure/product_adapters/product_mongo_repository');
const application = require('../../../../src/infraestructure/configuration/application');

// Mock console.log to do nothing:
require('../../../loggerMock');

describe('Product API', () => {
  let SKU = 'SKU';
  let name = 'product name';
  let productRepository = new ProductMongoRepository();

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  beforeEach(async () => {
    await dropCollections();
  });

  describe('Create Product', () => {
    const subject = async () => {
      response = await request(app)
        .post('/v1/product')
        .send({ SKU, name });
    };
      
    it('should return 200 status with message if saving product goes well', async () => {
      await subject();

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Product successfully created');
      expect(response.body.product).not.toBeUndefined();
      expect(response.body.product.productSKU).toBe(SKU);
    });

    it('should return 409 status with message if SKU is already taken', async () => {
      await productRepository.save({ SKU, name });

      await subject();

      expect(response.status).toBe(409);
      expect(response.body.message).toBe('SKU already taken');
    });

    it('should return 422 status with message if any param is not given', async () => {
      await productRepository.save({ SKU, name });
      name = undefined;

      await subject();

      expect(response.status).toBe(422);
      expect(response.body.message).toBe('Insufficient product arguments: name');
    });
  });
});
