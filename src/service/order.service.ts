import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { FormattedOrder } from '../types/FormattedOrder';
import { ServiceResponse } from '../types/ServiceResponse';

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

export default {
  listOrders,
};