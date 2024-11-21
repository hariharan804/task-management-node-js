import Schema, { JSONSchema } from "fluent-json-schema";
import { makeResponseSchema } from "@helpers";

const params = Schema.object().prop("is_active", Schema.boolean());

const getResponse = Schema.object()
  .prop(
    "tasks",
    Schema.array().items(
      Schema.object()
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
        .prop("created_by", Schema.number())
        .prop("updated_by", Schema.number())
        .prop("created_at", Schema.string().format("date-time"))
        .prop("updated_at", Schema.string().format("date-time"))
    )
  )
  .prop("overallCount", Schema.number())
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const GET_ALL = {
  description: "This API is used for fetching all records.",
  tags: ["TASKS"],
  query: params,
  response: makeResponseSchema(getResponse),
};
