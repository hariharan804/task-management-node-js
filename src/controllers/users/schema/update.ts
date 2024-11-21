import Schema, { JSONSchema } from "fluent-json-schema";
import { makeResponseSchema } from "@helpers";

// Request body schema
const requestBody = Schema.object()
  .prop("role_id", Schema.number().required())
  .prop("name", Schema.string().required())
  .prop("firebase_id", Schema.string().required())
  .prop("email", Schema.string().required())
  .prop("is_active", Schema.boolean())
  .prop("created_by", Schema.number())
  .prop("updated_by", Schema.number())
  .valueOf() as JSONSchema;

// Updated response schema with all properties from `props`
const responseBody = Schema.object()
  .prop("id", Schema.number())
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

// POST route schema
export const UPDATE = {
  description: "This API is used for adding a update record.",
  tags: ["USERS"],
  body: requestBody, // Request body schema for POST
  response: makeResponseSchema(responseBody), // Updated response schema
};
