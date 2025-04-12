import { snakeToCamel } from 'helpers/functions';
import { pagination } from './pagination';
interface GetServicePayload {
  list: Array<object>; // renamed from `page` to `data`
  count: number;
  totalCount: number;
  page: number; // renamed from offset to page
  limit: number;
}

export interface PaginationResponse {
  list: Array<object>;
  count?: number;
  limit?: number;
  page?: number;
  totalPages?: number;
  totalCount?: number;
  previousPage?: number | null;
  currentPage?: number;
  nextPage?: number | null;
  rest?: any;
}

export function paginationResponse(
  options: GetServicePayload
): PaginationResponse {
  const { list, count, totalCount, page, limit, ...rest } = options;

  const paginationResult = pagination({
    page,
    limit,
    totalCount,
  });

  const response: PaginationResponse = {
    list,
    count,
    limit,
    page,
    ...paginationResult,
    ...rest,
  };

  return snakeToCamel(response);
}
