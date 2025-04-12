/**
 * Represents the parameters extracted from a FastifyRequest object.
 */
interface RequestParameters {
  id: string;
  offset: number;
  limit: number;
  search?: string;
  rest?: { [key: string]: string | number };
}

/**
 * Extracts relevant parameters from a FastifyRequest object.
 *
 * @param {FastifyRequest} request - The FastifyRequest object containing query parameters and URL.
 * @returns {RequestParameters} An object containing extracted parameters (offset, limit, search, and url).
 * @throws {Error} Throws an error if there's an issue extracting parameters.
 */
export function queryRequestInfo(request: any): RequestParameters {
  const {
    query: { id, offset = 0, limit = 10, search, ...rest },
  } = request as {
    query: {
      id: string;
      offset: string;
      limit: string;
      search: string;
      rest: { [key: string]: string | number };
    };
    url: string;
  };

  return {
    id,
    offset: Number(offset || 0),
    limit: Number(limit || 10),
    search,
    ...rest,
  };
}
