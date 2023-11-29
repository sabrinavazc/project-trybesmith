import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiHttp from 'chai-http';
import { Request, Response } from 'express';
import ProductModel from '../../../src/database/models/product.model';
import productsMock from '../../mocks/products.mock';
import app from '../../../src/app';

chai.use(sinonChai);
chai.use(chaiHttp);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('TEST CREATEPRODUCT FUNCTION', function () {
    it('should create a product', async function () {
      const httpRequestBody = {
        name: 'Product 1',
        price: '10 moedas de ouro',
        orderId: 4,
      }
      const mockCreateReturn = ProductModel.build(productsMock.existingProduct);
      sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
  
      const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);
  
      expect(httpResponse.status).to.equal(201);
      expect(httpResponse.body).to.deep.equal({
        id: 1,
        name: 'Product 1',
        price: '10 moedas de ouro',
      });
    })
  });

  it('should return error when creating a product without a name', async function () {
    const httpRequestBody = {
      price: '10 moedas de ouro',
      orderId: 4,
    };
  
    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);
  
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({ message: '\"name\" is required' });
  });

  it('should return error when creating a product without a name', async function () {
    const httpRequestBody = {
      price: '10 moedas de ouro',
      orderId: 4,
    };

    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({ message: '\"name\" is required' });
  });
  
  it('should return a list of products', async function () {
    
    const mockProduct1 = ProductModel.build(productsMock.existingProductList[0]);
    const mockProduct2 = ProductModel.build(productsMock.existingProductList[1]);
    const mockProduct3 = ProductModel.build(productsMock.existingProductList[2]);
    const mockProduct4 = ProductModel.build(productsMock.existingProductList[3]);
    const mockProduct5 = ProductModel.build(productsMock.existingProductList[4]);
   
    sinon.stub(ProductModel, 'findAll').resolves(
      [mockProduct1, mockProduct2, mockProduct3, mockProduct4, mockProduct5]);

    const httpResponse = await chai.request(app).get('/products');

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(productsMock.existingProductList);
  });
});
