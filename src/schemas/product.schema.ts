import Joi from 'joi';

const createProductSchema = Joi.object({
  name: Joi.string().min(3).required().label('name'),
  price: Joi.string().min(3).required().label('price'),
  orderId: Joi.number().required().label('orderId'),
}).messages({
  'string.min': '{{#label}} length must be at least {{#limit}} characters long',
  'any.required': '{{#label}} is required',
  'string.base': '{{#label}} must be a string',
});

export default createProductSchema;