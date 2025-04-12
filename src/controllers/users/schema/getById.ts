import Schema from 'fluent-json-schema';
import { makeResponseSchema } from 'helpers/schema';

const customParams = Schema.object().prop('id', Schema.string());
const getResponse = Schema.object()
  .prop(
    'user',
    Schema.object()
      .prop('id', Schema.string())
      .prop('role_id', Schema.number())
      .prop('name', Schema.string())
      .prop('firebase_id', Schema.string())
      .prop('email', Schema.string())
      .prop('is_active', Schema.boolean())
      .prop('created_by', Schema.number())
      .prop('updated_by', Schema.number())
      .prop('created_at', Schema.string().format('date-time'))
      .prop('updated_at', Schema.string().format('date-time'))
  )
  .prop('meta', Schema.object().prop('message', Schema.string()));

export const userGetByIdSchema = {
  description: 'This API is used for fetching Tag by id.',
  tags: ['USERS'],
  query: customParams,
  response: makeResponseSchema(getResponse),
};
