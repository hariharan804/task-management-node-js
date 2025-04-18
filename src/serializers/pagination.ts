type PaginationResult = {
  totalPages: number;
  overAllCount: number;
  previousPage: number | null;
  currentPage: number;
  nextPage: number | null;
};
export function pagination(options: {
  page?: number;
  limit: number;
  overAllCount: number;
}): PaginationResult {
  const { limit, page = 1, overAllCount } = options;

  const totalPages = Math.ceil(overAllCount / limit);

  return {
    totalPages,
    overAllCount,
    previousPage: page === 1 ? null : page - 1,
    currentPage: page,
    nextPage: page < overAllCount ? page + 1 : null,
  };
}
