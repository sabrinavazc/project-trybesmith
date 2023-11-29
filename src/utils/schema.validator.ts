import { AnySchema } from 'joi';
import { SchemaValidatorResponse } from '../types/SchemaValidatorResponse';


const schemaValidator = (schema: AnySchema, data: Record<string, any>): SchemaValidatorResponse => {
  const { error } = schema.validate(data);

  if (error) {
    const { details } = error;

    const message = details.map((errObj) => errObj.message)
      .join(', ');

    return { error: true, message };
  }

  return { error: false, message: '' };
};

export default schemaValidator;