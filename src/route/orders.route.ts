import { Router } from 'express';
import orderController from '../controller/order.controller';
import authMiddleware from '../middleware/auth.middleware';
import orderMiddleware from '../middleware/order.middleware';

const orderRouter = Router();

orderRouter.get('/', orderController.listOrders);
orderRouter.post(
  '/', 
  authMiddleware,
  orderMiddleware.userValidation,
  orderMiddleware.productValidation,
  orderController.createOrder,
);

export default orderRouter;