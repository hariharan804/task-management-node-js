/**
 * Represents the parameters extracted from a FastifyRequest object.
 */
interface RequestParameters {
  id: string;
  page: number;
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
    query: { id, page = 1, limit = 10, search, ...rest },
  } = request as {
    query: {
      id: string;
      page: string;
      limit: string;
      search: string;
      rest: { [key: string]: string | number };
    };
  };

  return {
    id,
    page: Number(page || 1),
    limit: Number(limit || 10),
    search,
    ...rest,
  };
}
