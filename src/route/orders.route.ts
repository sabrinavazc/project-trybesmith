import { Router } from 'express';
import orderController from '../controller/order.controller';
import authMiddleware from '../middleware/auth.middleware';

const orderRouter = Router();

orderRouter.get('/', orderController.listOrders);
orderRouter.post('/', authMiddleware, orderController.createOrder);

export default orderRouter;