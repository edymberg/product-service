const request = require('supertest');
const { connectDB, dropDB, dropCollections } = require('../../connection');
const { app } = require('../../../src/app');
const { application } = require('../../../src/application');

// Mock console.log to do nothing:
require('../../loggerMock');

describe('Product API', () => {
  let SKU = 'SKU';
  let name = 'product name';

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
      expect(response.body.productSKU).toBe(SKU);
    });

    it('should return 409 status with message if SKU is already taken', async () => {
      await application.productRepository.save({ SKU, name });

      await subject();

      expect(response.status).toBe(409);
      expect(response.body.message).toBe('SKU already taken');
    });

    it('should return 500 status with message if any action fails', async () => {
      application.productRepository.save = jest.fn(() => {
        throw new Error('Test error');
      });

      await subject();

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Oops! Something failed, please try again later');
    });
  });
});
