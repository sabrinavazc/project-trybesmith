import { Request, Response } from 'express';
import orderService from '../service/order.service';
import statusCode from '../utils/satus.code';

async function listOrders(_req: Request, res: Response): Promise<Response> {
  const serviceResponse = await orderService.listOrders();
      
  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(statusCode(serviceResponse.status)).json(serviceResponse.data);  
  }
      
  return res.status(200).json(serviceResponse.data);
}

async function createOrder(req:Request, res: Response): Promise<Response> {
  const { productIds, userId }: { productIds: number[], userId: number } = req.body;
  
  const serviceResponse = await orderService.createOrder(userId, productIds);

  return res.status(201).json(serviceResponse.data);
}

export default {
  listOrders,
  createOrder,
};