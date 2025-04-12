import { FastifyRequest, FastifyReply, RouteGenericInterface } from 'fastify';
import { handleResponse, responseType } from './responseHandler';

// export function withTryCatch<T extends RouteGenericInterface>(
//   handler: (request: FastifyRequest<T>, reply: FastifyReply) => Promise<unknown>
// ) {
export function withTryCatch<T extends RouteGenericInterface>(
  handler: (req: FastifyRequest<T>, reply: FastifyReply) => Promise<any>,
  options?: {
    customMessage?: string;
  }
) {
  return async (req: FastifyRequest<T>, reply: FastifyReply) => {
    try {
      return await handler(req, reply);
    } catch (error) {
      req.log.error(error);

      return handleResponse(req, reply, responseType.INTERNAL_SERVER_ERROR, {
        error,
        customMessage: options?.customMessage,
      });
    }
  };
}
