import { Request, Response, NextFunction } from 'express';
import UserModel from '../database/models/user.model';

async function userValidation(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: '"userId" is required' });
  }

  if (typeof userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  }

  const user = await UserModel.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ message: '"userId" not found' });
  }

  next();
}

async function productValidation(
  req: Request, 
  res: Response, 
  next: NextFunction,
): Promise<unknown> {
  const { productIds } = req.body;

  if (!productIds) { 
    return res.status(400).json({ message: '"productIds" is required' });
  }

  if (!Array.isArray(productIds)) {
    return res.status(422).json({ message: '"productIds" must be an array' });
  }

  if (productIds.length <= 0) {
    return res.status(422).json({ message: '"productIds" must include only numbers' });
  }

  next();
}

export default { userValidation, productValidation };