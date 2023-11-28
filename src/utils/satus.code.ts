export default function statusCode(status: string): number {
  const statusHttp: Record<string, number> = {
    SUCCESSFUL: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INVALID_INPUT: 422,
  };
  
  return statusHttp[status] ?? 500;
}