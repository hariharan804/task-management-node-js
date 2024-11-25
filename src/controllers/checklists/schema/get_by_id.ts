import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

const customParams = Schema.object().prop("id", Schema.string());
const getResponse = Schema.object()
  .prop(
    "checklists",
      Schema.object()
      .prop("id", Schema.number().required())          
      .prop("task_id", Schema.number().required())
      .prop("description", Schema.string())         
      .prop("is_active", Schema.boolean())     
      .prop("created_by", Schema.number())      
      .prop("updated_by", Schema.number())      
      .prop("created_at", Schema.string())            
      .prop("updated_at", Schema.string()) 
    )
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const GET_BY_ALL = {
  description:
    "This API is used for fetching by id.",
  tags: ["Checklists"],
  query: customParams,
  response: makeResponseSchema(getResponse),
};
