import { pagination } from './pagination';
interface GetServicePayload {
  list: Array<object>;
  count: number;
  overAllCount: number;
  page: number;
  limit: number;
}

export interface PaginationResponse {
  list: Array<object>;
  count?: number;
  limit?: number;
  page?: number;
  totalPages?: number;
  overAllCount?: number;
  previousPage?: number | null;
  currentPage?: number;
  nextPage?: number | null;
  rest?: any;
}

export function paginationResponse(
  options: GetServicePayload
): PaginationResponse {
  const { list, count, overAllCount, page, limit, ...rest } = options;

  const paginationResult = pagination({
    page,
    limit,
    overAllCount,
  });

  const response: PaginationResponse = {
    list,
    count,
    limit,
    page,
    ...paginationResult,
    ...rest,
  };

  return response;
}
