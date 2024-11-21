import Schema, { JSONSchema } from "fluent-json-schema";
import { makeResponseSchema } from "@helpers";

const params = Schema.object().prop("is_active", Schema.boolean());

const getResponse = Schema.object()
  .prop(
    "users",
    Schema.array().items(
      Schema.object()
        .prop("id", Schema.string())
        .prop("role_id", Schema.number())
        .prop("name", Schema.string())
        .prop("firebase_id", Schema.string())
        .prop("email", Schema.string())
        .prop("is_active", Schema.boolean())
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
  description: "This API is used for fetching all Users.",
  tags: ["USERS"],
  query: params,
  response: makeResponseSchema(getResponse),
};
