import { snakeToCamel } from 'helpers/functions';

interface PostServicePayload {
  result: any;
}

/**
 * Represents the structure of the paginated response for a GET service.
 */
interface PostServiceResponse {
  status: number;
  apiStatus: string;
  data: any;
  message: string;
}

/**
 * Formats the response of a GET service or endpoint.
 *
 * @param {PostServicePayload} options - The response object containing paginated information.
 * @returns {GetServiceResponse} An object containing extracted parameters related to pagination.
 * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
 */
export function prepareResult(
  options: PostServicePayload
): PostServiceResponse {
  const { result } = options;

  const Result = snakeToCamel(result);

  return {
    ...Result,
  };
}
