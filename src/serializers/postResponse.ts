import { snakeToCamel } from 'helpers/functions';

export function prepareResult(result: any): any {
  const Result = snakeToCamel(result);

  return {
    ...Result,
  };
}
