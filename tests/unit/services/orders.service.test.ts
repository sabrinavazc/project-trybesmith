import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import orderService from '../../../src/service/order.service';
import UserModel from '../../../src/database/models/user.model';
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

  it('Test whether it is possible to create a product with multiple productIds', async function () {
    const fakeUser = {
      id: 1,
      level: 1,
      password: '$2y$10$grVqJMS7wPyLVo4M.yQ4b.hVwZsaDdX/8t1eo4k2kG2MaizIsIHuu',
      username: 'test',
      vocation: 'Dev',
    };

    const fakeEntry = {
      userId: fakeUser.id,
      productIds: [1, 2, 3, 4, 5]
    };

    sinon.stub(OrderModel, 'bulkCreate').resolves();
    sinon.stub(UserModel, 'findByPk').resolves(UserModel.build(fakeUser));

    const serviceResponse = await orderService.createOrder(fakeEntry.userId, fakeEntry.productIds);

    expect(serviceResponse).to.been.deep.equal({
      status: 'CREATED',
      data: fakeEntry,
    });
  });
    // Teste para verificar se é possível criar um pedido com múltiplos productIds
    it('should create a product with multiple productIds', async function () {
      const fakeUser = {
        id: 1,
        level: 1,
        password: '$2y$10$grVqJMS7wPyLVo4M.yQ4b.hVwZsaDdX/8t1eo4k2kG2MaizIsIHuu',
        username: 'test',
        vocation: 'Dev',
      };
  
      const fakeEntry = {
        userId: fakeUser.id,
        productIds: [1, 2, 3, 4, 5]
      };
  
      sinon.stub(OrderModel, 'bulkCreate').resolves();
      sinon.stub(UserModel, 'findByPk').resolves(UserModel.build(fakeUser));
  
      const serviceResponse = await orderService.createOrder(fakeEntry.userId, fakeEntry.productIds);
  
      expect(serviceResponse).to.be.deep.equal({
        status: 'CREATED',
        data: fakeEntry,
      });
    });


});
