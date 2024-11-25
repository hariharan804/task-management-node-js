import Schema, { JSONSchema } from "fluent-json-schema";
import { makeResponseSchema } from "@helpers";

const params = Schema.object().prop("is_active", Schema.boolean());

const getResponse = Schema.object()
  .prop(
    "checklists",
    Schema.array().items(
      Schema.object()
      .prop("id", Schema.number().required())          
      .prop("checklist_id", Schema.number().required())      
      .prop("task_id", Schema.number().required())
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
  tags: ["ChecklistsMapping"],
  query: params,
  response: makeResponseSchema(getResponse),
};
