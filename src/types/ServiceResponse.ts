type ServiceResponseErrorType = 'INVALID_INPUT' | 
'CONFLICT' | 'NOT_FOUND' | 
'UNAUTHORIZED' | 'BAD_REQUEST' 
| 'CREATED' | 'SUCCESSFUL';

export type ServiceResponseError = {
  status: ServiceResponseErrorType, 
  data: { message: string }
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED', 
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;