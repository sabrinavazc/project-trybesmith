import { Router } from 'express';
import orderRouter from './orders.route';
import productRouter from './products.route';

const Route = Router();

Route.use('/products', productRouter);
Route.use('/orders', orderRouter);

export default Route;