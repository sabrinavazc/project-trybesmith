import Joi from 'joi';

const createOrderSchema = Joi.object({
  userId: Joi.number().strict().required(),
  productIds: Joi.array().items(Joi.number().strict()).min(1).required(),
}).messages({ 'array.min': '"productIds" must include only numbers' });

export default createOrderSchema;