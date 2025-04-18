/**
 * Represents the parameters extracted from a FastifyRequest object.
 */
interface RequestParameters {
  id: string;
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sort: 'asc' | 'desc';
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
    query: { id, page = 1, limit = 10, search, sort = 'desc', sortBy, ...rest },
  } = request as {
    query: {
      id: string;
      page: string;
      limit: string;
      search: string;
      sortBy: string;
      sort: 'asc' | 'desc';
      rest: { [key: string]: string | number };
    };
  };

  return {
    id,
    page: Number(page) > 0 ? Number(page) - 1 : 0,
    limit: Number(limit) || 10,
    search,
    sort,
    sortBy,
    ...rest,
  };
}
