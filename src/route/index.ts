import { Router } from 'express';
import productRouter from './products.route';

const Route = Router();

Route.use('/products', productRouter);

export default Route;