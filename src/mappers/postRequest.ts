import { FastifyRequest } from 'fastify';

/**
 * Extracts relevant parameters from a FastifyRequest object.
 *
 * @param {FastifyRequest} request - The FastifyRequest object containing body parameters and URL.
 * @returns An object containing extracted parameters.
 * @throws {Error} Throws an error if there's an issue extracting parameters.
 */
export function postRequestInfo(request: FastifyRequest) {
  const body = request.body as any;
  const params = request.params as any;
  return {
    ...body,
    ...params,
  };
}
