/* eslint-disable security/detect-object-injection */
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

export function queryParamsSchema(options?: {
  extraSchema?: ObjectSchema;
  removeProps?: string[];
  required?: string[];
}) {
  // Define base properties.
  const baseProperties: { [key: string]: any } = {
    page: S.number().minimum(1).default(1),
    limit: S.number().minimum(1).maximum(100).default(10),
    search: S.string().maxLength(100).default(''),
    sortBy: S.string().default('updated_at'),
    sort: S.string().enum(['asc', 'desc']).default('desc'),
  };

  // Remove any properties as specified.
  if (options?.removeProps) {
    for (const prop of options.removeProps) {
      delete baseProperties[prop];
    }
  }

  // Create a fluent JSON schema builder.
  let schemaBuilder: any = S.object();

  // Add base properties.
  for (const key in baseProperties) {
    // If the property is specified as required, chain its required marker.
    if (options?.required && options.required.includes(key)) {
      schemaBuilder = schemaBuilder.prop(key, baseProperties[key].required());
    } else {
      schemaBuilder = schemaBuilder.prop(key, baseProperties[key]);
    }
  }

  // Extend the builder with the extraSchema if provided.
  if (options?.extraSchema) {
    schemaBuilder = schemaBuilder.extend(options?.extraSchema);
  }

  // Get the raw JSON schema.
  const finalSchema = schemaBuilder.valueOf();

  // For any properties coming from extraSchema or not marked with `.required()`,
  // forcefully set the required list on the raw schema.
  if (options?.required) {
    // Combine any already existing required keys with our options.
    finalSchema.required = Array.from(
      new Set([...(finalSchema.required || []), ...options.required])
    );
  }

  return finalSchema;
}

// export function queryParamsSchema(
//   extraSchema?: (schema: ObjectSchema) => ObjectSchema,
//   excludeFields: string[] = []
// ) {
//   let baseSchema = S.object()
//     .prop('page', S.number().minimum(1).default(1))
//     .prop('limit', S.number().minimum(1).maximum(100).default(10))
//     .prop('search', S.string().maxLength(100).default(''))
//     .prop('sortBy', S.string().default('id'))
//     .prop('sort', S.string().enum(['asc', 'desc']).default('desc'));

//   if (extraSchema) {
//     baseSchema = extraSchema(baseSchema);
//   }

//   return baseSchema;
// }

// // Combine the base schema with any extra schema passed
// const mergedSchema: any = extraSchema
//   ? baseSchema.extend(extraSchema)
//   : baseSchema.omit('page', 'limit', 'search', 'sortBy', 'sort');
// baseSchema = baseSchema.prop('page', S.number().minimum(1).default(1));
// // Remove properties that should be excluded
// excludeFields.forEach((field) => {
//   mergedSchema.removeProperty(field);
// });
