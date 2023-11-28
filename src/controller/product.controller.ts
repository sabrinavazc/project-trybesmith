import { Request, Response } from 'express';
import productService from '../service/product.service';
import statusCode from '../utils/satus.code';

async function createProduct(req:Request, res: Response) {
    const { name, price, orderId } = req.body;
    
    
    const serviceResponse = await productService.createProduct({ name, price, orderId });

    if (serviceResponse.status !== 'CREATED') {
      return res.status(statusCode(serviceResponse.status)).json(serviceResponse.data);  
    }
    
  
    res.status(201).json(serviceResponse.data);
};

async function listProducts(_req: Request, res: Response) {
    const serviceResponse = await productService.listProducts();
    
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(statusCode(serviceResponse.status)).json(serviceResponse.data);  
    }
    
    res.status(200).json(serviceResponse.data);
  }
  
  // async function listProductById(req: Request, res: Response) {
  //   const id = Number(req.params.id);
  
  //   const serviceResponse = await productService.listProductById(id);
  
  //   if (serviceResponse.status !== 'SUCCESSFUL') {
  //     return res.status(statusCode(serviceResponse.status)).json(serviceResponse.data);  
  //   }
    
  //   res.status(200).json(serviceResponse.data);
  // }


export default {
    listProducts,
    createProduct,
};
