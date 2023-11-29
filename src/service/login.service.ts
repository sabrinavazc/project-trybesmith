import jwtUtil from '../utils/jwt.util';
import { comparePassword } from '../utils/bcrypt.util';
import { ServiceResponse } from '../types/ServiceResponse';
import UserModel from '../database/models/user.model';
import { Token } from '../types/Token';
import { Login } from '../types/Login';
import loginSchema from '../schemas/login.schema';
import schemaValidator from '../utils/schema.validator';

async function verifyLogin(login: Login): Promise<ServiceResponse<Token>> {
  const validateResponse = schemaValidator(loginSchema, login);

  if (validateResponse.error) {
    return { status: 'BAD_REQUEST', data: { message: validateResponse.message } };
  }

  const foundUser = await UserModel.findOne({ where: { username: login.username } });

  if (!foundUser) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const isPasswordValid = comparePassword(login.password, foundUser.dataValues.password);

  if (!isPasswordValid) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const { id, username } = foundUser.dataValues;
  const token = jwtUtil.sign({ id, username });

  return { status: 'SUCCESSFUL', data: { token } };
}

export default {
  verifyLogin,
};