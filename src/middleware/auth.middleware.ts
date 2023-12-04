import { NextFunction, Request, Response } from 'express';
import jwtUtil from '../utils/jwt.util';
import UserModel from '../database/models/user.model';

function extractToken(authorization: string): string {
  return authorization.split(' ')[1];
}

async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<any> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = extractToken(authorization);

  try {
    const decoded = jwtUtil.verify(token);

    if (!decoded || !decoded.username) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await UserModel.findOne({ where: { username: decoded.username } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export default authMiddleware;

