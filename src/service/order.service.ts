import OrderModel from '../database/models/order.model';
import UserModel from '../database/models/user.model';
import ProductModel from '../database/models/product.model';
import { FormattedOrder } from '../types/FormattedOrder';
import { ServiceResponse } from '../types/ServiceResponse';
import schemaValidator from '../utils/schema.validator';
import { Order } from '../types/Order';
import createOrderSchema from '../schemas/order.schema';
import getError from '../utils/get.error';

async function listOrders(): Promise<ServiceResponse<FormattedOrder[]>> {
  const orders = await OrderModel.findAll();

  const formattedOrders: FormattedOrder[] = await Promise.all(
    orders.map(async (order) => {
      const productIds = await ProductModel.findAll({
        attributes: ['id'],
        where: { orderId: order.dataValues.id },
      });

      return {
        id: order.dataValues.id,
        userId: order.dataValues.userId,
        productIds: productIds.map((product) => product.dataValues.id),
      };
    }),
  );

  return { status: 'SUCCESSFUL', data: formattedOrders };
}

async function createOrder(
  userId: number,
  productIds: number[],
): Promise<ServiceResponse<Omit<Order, 'id'>>> {
  const validateResponse = schemaValidator(createOrderSchema, { userId, productIds });
 
  if (validateResponse.error) {
    if (getError(validateResponse.message)) {
      return { status: 'INVALID_INPUT', data: { message: validateResponse.message } };
    }
    return { status: 'BAD_REQUEST', data: { message: validateResponse.message } }; 
  }

  const userExist = await UserModel.findByPk(userId);
  if (!userExist) { 
    return { status: 'NOT_FOUND', data: { message: '"userId" not found' } };
  }
  
  await OrderModel.bulkCreate((productIds.map((productId) => ({ userId, productId }))));

  const newOrder = { userId, productIds };
  
  return { status: 'CREATED', data: newOrder };
}

export default {
  listOrders,
  createOrder,
};