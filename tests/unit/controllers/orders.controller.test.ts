import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import orderController from '../../../src/controller/order.controller';
import orderService from '../../../src/service/order.service';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should list all orders correctly', async function () {
    const ordersProductIds = [{ id: 1, userId: 1, productIds: [1, 2] }];

    sinon.stub(orderService, 'listOrders').resolves({ status: 'SUCCESSFUL', data: ordersProductIds });

    await orderController.listOrders(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(ordersProductIds);
  });
});
