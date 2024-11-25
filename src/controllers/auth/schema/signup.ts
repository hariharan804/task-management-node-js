import Schema, { JSONSchema } from "fluent-json-schema";
import { makeResponseSchema } from "@helpers";

const params = Schema.object()
.prop("role_id", Schema.number())
.prop("name", Schema.string())
.prop("firebase_id", Schema.string())
.prop("password", Schema.string().required())
.prop("email", Schema.string().required())
.prop("is_active", Schema.boolean())
.prop("created_by", Schema.number())
.prop("updated_by", Schema.number()).valueOf() as JSONSchema;

const getResponse = Schema.object()
  .prop("id", Schema.number())
  .prop("accessToken", Schema.string())
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const SIGNUP = {
  description: "This API is used signup.",
  tags: ["AUTH"],
  body: params,
  response: makeResponseSchema(getResponse),
};



