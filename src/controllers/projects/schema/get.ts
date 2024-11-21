import Schema, { JSONSchema } from "fluent-json-schema";
import { makeResponseSchema } from "@helpers";

const params = Schema.object().prop("is_active", Schema.boolean());

const getResponse = Schema.object()
  .prop(
    "projects",
    Schema.array().items(
      Schema.object()
      .prop("id", Schema.number().required())          
      .prop("name", Schema.string().required())      
      .prop("description", Schema.string())         
      .prop("manager_id", Schema.number())          
      .prop("is_active", Schema.boolean())              
      .prop("created_by", Schema.number())      
      .prop("updated_by", Schema.number())      
      .prop("created_at", Schema.string())            
      .prop("updated_at", Schema.string()) 
    )
  )
  .prop("overallCount", Schema.number())
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const GET_ALL = {
  description: "This API is used for fetching all records.",
  tags: ["PROJECT"],
  query: params,
  response: makeResponseSchema(getResponse),
};
