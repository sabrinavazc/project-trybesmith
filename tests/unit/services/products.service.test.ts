import { expect } from 'chai';
import sinon from 'sinon';
import ProductService from '../../../src/service/product.service';
import ProductModel from '../../../src/database/models/product.model';
import OrderModel from '../../../src/database/models/order.model';
import validateParamsCreateProduct from '../../../src/utils/validate.response';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  describe('listProducts', function () {
    it('should return a list of products', async function () {
      // Simular o retorno de produtos ao chamar ProductModel.findAll
      const findAllStub = sinon.stub(ProductModel, 'findAll').resolves([]);

      const products = await ProductService.listProducts();

      expect(products.status).to.equal('SUCCESSFUL');
      expect(products.data).to.deep.equal([]);

      findAllStub.restore();
    });
  });
});
