import Schema, { JSONSchema } from "fluent-json-schema";
import { makeResponseSchema } from "@helpers";

const params = Schema.object()
.prop("password", Schema.string().required())
.prop("email", Schema.string().required())
 .valueOf() as JSONSchema;

 const getResponse = Schema.object()
.prop("id", Schema.number())
.prop("accessToken", Schema.string())
.prop("meta", Schema.object().prop("message", Schema.string()))
.valueOf() as JSONSchema;

export const LOGIN = {
  description: "This API is used for fetching Users login.",
  tags: ["AUTH"],
  body: params,
  response: makeResponseSchema(getResponse),
};
