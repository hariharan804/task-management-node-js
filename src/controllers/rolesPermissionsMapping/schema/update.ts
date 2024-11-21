import Schema, { JSONSchema } from "fluent-json-schema";
import { makeResponseSchema } from "@helpers";

// Request body schema
const requestBody = Schema.object()
  .prop("id", Schema.number().required())          
  .prop("role_id", Schema.number().required())      
  .prop("permission_id", Schema.number())         
  .prop("created_by", Schema.number())      
  .prop("updated_by", Schema.number())      
  .prop("created_at", Schema.string())            
  .prop("updated_at", Schema.string())
  .valueOf() as JSONSchema;
  
// Updated response schema with all properties from `props`
const responseBody = Schema.object()
        .prop("id", Schema.number())
        .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

// POST route schema
export const UPDATE = {
  description: "This API is used for adding a update record.",
  tags: ["RolesPermissionsMapping"],
  body: requestBody,   // Request body schema for POST
  response: makeResponseSchema(responseBody),  // Updated response schema
};
