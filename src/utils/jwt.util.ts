import jwt, { JwtPayload } from 'jsonwebtoken';
import { TokenPayload } from '../types/TokenPayload';

const secret = process.env.JWT_SECRET || 'supersecret123456';

function sign(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verify(token: string): TokenPayload { 
  const data = jwt.verify(token, secret) as TokenPayload; 
  return data; 
}

function decodeToken(token: string): string | JwtPayload | null {
  return jwt.decode(token);
}

export default {
  sign,
  verify,
  decodeToken,
};