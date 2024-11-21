import Schema, { JSONSchema } from "fluent-json-schema";
import { makeResponseSchema } from "@helpers";

// Request body schema
const requestBody = Schema.object()
  .prop("project_id", Schema.number())          
  .prop("assigned_by", Schema.number())         
  .prop("assigned_to", Schema.number())         
  .prop("name", Schema.string().required())      
  .prop("description", Schema.string())         
  .prop("is_active", Schema.boolean())          
  .prop("is_completed", Schema.boolean())       
  .prop("status", Schema.string())              
  .prop("estimated_time", Schema.number())      
  .prop("start_at", Schema.string())            
  .prop("end_at", Schema.string())              
  .valueOf() as JSONSchema;
  
// Updated response schema with all properties from `props`
const responseBody = Schema.object()
        .prop("id", Schema.number())
        .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

// POST route schema
export const CREATE = {
  description: "This API is used for adding a new record.",
  tags: ["TASKS"],
  body: requestBody,   // Request body schema for POST
  response: makeResponseSchema(responseBody),  // Updated response schema
};
