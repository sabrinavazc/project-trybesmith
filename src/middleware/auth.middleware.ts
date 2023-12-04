import { NextFunction, Request, Response } from 'express';
import jwtUtil from '../utils/jwt.util';
import UserModel from '../database/models/user.model';

const INVALID_TOKEN_MESSAGE = 'Invalid token';

function extractToken(authorization: string): string {
  return authorization.split(' ')[1];
}

async function verifyToken(token: string): Promise<string | null> {
  try {
    const decoded = jwtUtil.verify(token);

    if (!decoded || !decoded.username) {
      return null;
    }

    return decoded.username;
  } catch (err) {
    return null;
  }
}

async function findUserByUsername(username: string): Promise<any> {
  const user = await UserModel.findOne({ where: { username } });
  return user;
}

async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<any> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = extractToken(authorization);
  const username = await verifyToken(token);

  if (!username) {
    return res.status(401).json({ message: INVALID_TOKEN_MESSAGE });
  }

  const user = await findUserByUsername(username);

  if (!user) {
    return res.status(401).json({ message: INVALID_TOKEN_MESSAGE });
  }

  next();
}

export default authMiddleware;
