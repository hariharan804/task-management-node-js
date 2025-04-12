type PaginationResult = {
  totalPages: number;
  totalCount: number;
  previousPage: number | null;
  currentPage: number;
  nextPage: number | null;
};
export function pagination(options: {
  page?: number;
  limit: number;
  totalCount: number;
}): PaginationResult {
  const { limit, page = 1, totalCount } = options;

  const totalPages = Math.ceil(totalCount / limit);

  return {
    totalPages,
    totalCount,
    previousPage: page === 1 ? null : page - 1,
    currentPage: page,
    nextPage: page < totalPages ? page + 1 : null,
  };
}
