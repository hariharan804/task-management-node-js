import S from 'fluent-json-schema';
import { makeResponseSchema } from 'helpers/schema';

// Common properties
const metaSchema = S.object().prop('message', S.string());

// Request body schema
const requestBody = S.object()
  .prop('role_id', S.number().required())
  .prop('name', S.string().required())
  .prop('firebase_id', S.string().required())
  .prop('email', S.string().required())
  .prop('is_active', S.boolean())
  .prop('created_by', S.number())
  .prop('updated_by', S.number());

// Response schema
const responseBody = S.object().prop('id', S.number()).prop('meta', metaSchema);

// POST route schema
export const userCreateSchema = {
  description: 'This API is used for adding a new user record.',
  tags: ['USERS'],
  body: S.object().prop('id', S.string()), // Request body schema for POST
  response: makeResponseSchema(responseBody), // Optimized response schema
};
