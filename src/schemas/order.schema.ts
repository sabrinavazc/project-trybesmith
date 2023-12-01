// import Joi from 'joi';

// const createOrderSchema = Joi.object({
//   userId: Joi.number()
//     .required()
//     .messages({
//       'any.required': '"userId" is required',
//       'number.base': '"userId" must be a number',
//     }),
//   productIds: Joi.array()
//     .items(Joi.number().required())
//     .min(1)
//     .messages({
//       'any.required': '"productIds" is required',
//       'array.min': '"productIds" must include only numbers',
//       'array.base': '"productIds" must be an array',
//     }),
// });

// export default createOrderSchema;
