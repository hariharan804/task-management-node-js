import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

const customParams = Schema.object().prop("id", Schema.string());
const getResponse = Schema.object()
  .prop(
    "notification",
      Schema.object()
      .prop("user_id", Schema.number().required())      
      .prop("is_read", Schema.boolean())          
      .prop("message", Schema.string())              
      .prop("created_at", Schema.string())            
      .prop("updated_at", Schema.string()) 
    )
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const GET_BY_ALL = {
  description:
    "This API is used for fetching by id.",
  tags: ["NOTIFICATION"],
  query: customParams,
  response: makeResponseSchema(getResponse),
};
