import { Router } from 'express';
import loginRouter from './login.route';
import orderRouter from './orders.route';
import productRouter from './products.route';

const Route = Router();

Route.use('/products', productRouter);
Route.use('/orders', orderRouter);
Route.use('/login', loginRouter);

export default Route;