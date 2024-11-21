import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

const customParams = Schema.object().prop("id", Schema.string());

const getResponse = Schema.object()
.prop("isDeleted", Schema.boolean())
.prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const DELETE_BY_ALL = {
  description: "This API is used for deleting by id.",
  tags: ["TASK"],
  query: customParams,
  response: makeResponseSchema(getResponse),
};
