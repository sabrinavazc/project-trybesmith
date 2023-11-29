import bcrypt from 'bcryptjs';

export const comparePassword = (password: string, hash: string): boolean =>
  bcrypt.compareSync(password, hash);

export const createHash = (password: string): string => bcrypt.hashSync(password);