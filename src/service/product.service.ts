import ProductModel, 
{ ProductInputtableTypes, 
  ProductSequelizeModel } from '../database/models/product.model';
import OrderModel from '../database/models/order.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';
import createProductSchema from '../schemas/product.schema';
import schemaValidator from '../utils/schema.validator';
import getError from '../utils/get.error';

async function listProducts(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const products = await ProductModel.findAll();
  
  return { status: 'SUCCESSFUL', data: products };
}

// async function listProductById(id:number): Promise<ServiceResponse<Product>>{
//     const product = await ProductModel.findByPk(id);
//     let serviceResponse: ServiceResponse<Product>; 
    
//     if (!product) { 
//       serviceResponse = { status: 'NOT_FOUND', data: { message: 'Product not found' } }; 
//       return serviceResponse; 
//     } 
    
//     serviceResponse = { status: 'SUCCESSFUL', data: product.dataValues }; 
   
//     return serviceResponse; 
// };

async function createProduct(product: ProductInputtableTypes): 
Promise<ServiceResponse<Omit<Product, 'orderId'>>> {
  const validateResponse = schemaValidator(createProductSchema, product);
  if (validateResponse.error) {
    if (getError(validateResponse.message)) {
      return { status: 'INVALID_INPUT', data: { message: validateResponse.message } };
    }
    return { status: 'BAD_REQUEST', data: { message: validateResponse.message } }; 
  }

  const productExist = await OrderModel.findByPk(product.orderId);
  if (productExist) { 
    return { status: 'CONFLICT', data: { message: 'orderId already' } };
  }
  const createdProduct = await ProductModel.create({ ...product });
  
  const { id, name, price } = createdProduct.get() as { id: number; name: string; price: string };
  
  return { status: 'CREATED', data: { id, name, price } };
}

export default {
  listProducts,
  createProduct,
};