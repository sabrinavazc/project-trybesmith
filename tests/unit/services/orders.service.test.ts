import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import orderMock from '../../mocks/order.mock';
import productMock from '../../mocks/products.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });

  it('should list all orders', async function () {
    const mockOrder1 = OrderModel.build(orderMock.ordersList[0]);
    const mockOrder2 = OrderModel.build(orderMock.ordersList[1]);

    const productMock1 = ProductModel.build(productMock.existingProductList[0]);
    const productMock2 = ProductModel.build(productMock.existingProductList[1]);
    const productMock3 = ProductModel.build(productMock.existingProductList[2]);
    const productMock4 = ProductModel.build(productMock.existingProductList[3]);
    const productMock5 = ProductModel.build(productMock.existingProductList[4]);

    sinon.stub(OrderModel, 'findAll').resolves([mockOrder1, mockOrder2]);
    const productFindAll = sinon.stub(ProductModel, 'findAll');
    productFindAll.onFirstCall().resolves([productMock1, productMock2]);
    productFindAll.onSecondCall().resolves([productMock3, productMock4, productMock5]);

    const httpResponse = await chai.request(app).get('/orders');

    expect (httpResponse.status).to.equal(200);
    expect (httpResponse.body).to.deep.equal(orderMock.ordersList);
  });
  it('should handle empty orders list', async function () {
    sinon.stub(OrderModel, 'findAll').resolves([]); // Simula uma lista vazia de pedidos
  
    const httpResponse = await chai.request(app).get('/orders');
  
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal([]);
  });
});
