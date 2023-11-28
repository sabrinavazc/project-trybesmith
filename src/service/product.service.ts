import ProductModel, 
{ ProductInputtableTypes, 
  ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';
import OrderModel from '../database/models/order.model';
import { ServiceResponse } from '../types/ServiceResponse';
import validateParamsCreateProduct from '../utils/validate.response';

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

async function createProduct(
  product: ProductInputtableTypes,
): Promise<ServiceResponse<Omit<Product, 'orderId'>>> {
  let responseService: ServiceResponse<Omit<Product, 'orderId'>>;
  
  const error = validateParamsCreateProduct(product);
  if (error) {
    responseService = { status: 'INVALID_INPUT', data: { message: error } };
    return responseService;
  }

  const productExist = await OrderModel.findByPk(product.orderId);

  if (productExist) {
    return { status: 'CONFLICT', data: { message: 'This orderId already registered' } };
  }
  
  const createdProduct = await ProductModel.create({ ...product });
  
  const id = createdProduct.get('id') as number;
  const name = createdProduct.get('name') as string;
  const price = createdProduct.get('price') as string;

  const responseData = { id, name, price };
  
  return { status: 'CREATED', data: responseData };
}

export default {
  listProducts,
  createProduct,
};