import S, { JSONSchema, ObjectSchema } from 'fluent-json-schema';

const metaSchema = S.object()
  .prop('message', S.string())
  .prop('code', S.number())
  .prop('description', S.string());

const buildErrorSchema = (description: string): JSONSchema =>
  S.object()
    .description(description)
    .prop(
      'meta',
      S.object()
        .prop('isError', S.boolean())
        .prop('origin', S.string())
        .prop('message', S.string())
        .prop('description', S.string())
        .prop('code', S.number())
        .prop('timestamp', S.string())
    )
    .valueOf() as JSONSchema;

export const makeResponseSchema = (successResponse: ObjectSchema) => {
  return {
    '200': S.object()
      .prop('data', successResponse)
      .prop('meta', metaSchema)
      .valueOf(),
    '400': buildErrorSchema('Bad Request'),
    '401': buildErrorSchema('Unauthorized Response'),
    '404': buildErrorSchema('Not Found'),
    // '409': buildErrorSchema('Conflict / Already Exists'),
    '500': buildErrorSchema('Internal Server Error'),
  };
};

export const paginationResponseSchema = (itemSchema: any) =>
  makeResponseSchema(
    S.object()
      .prop('list', S.array().items(itemSchema).required())
      .prop('count', S.number())
      .prop('limit', S.number())
      .prop('page', S.number())
      .prop('totalPages', S.number())
      .prop('totalCount', S.number())
      .prop('previousPage', S.number().default(null))
      .prop('currentPage', S.number())
      .prop('nextPage', S.number().default(null))
  );
