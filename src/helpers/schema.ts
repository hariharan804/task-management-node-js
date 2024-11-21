import Schema, { JSONSchema } from "fluent-json-schema";

export const makeResponseSchema = (response: JSONSchema) => {
    const responseType: Record<string, JSONSchema> = {
      "200": response,
      "400": Schema.object()
        .description("Bad Request")
        .prop("error", Schema.boolean())
        .prop("message", Schema.string())
  
        .prop(
          "error",
          Schema.object()
            .prop("isError", Schema.boolean())
            .prop("message", Schema.string())
            .prop("origin", Schema.string())
            .prop("timestamp", Schema.string())
        )
        .valueOf() as JSONSchema,
      "401": Schema.object()
        .description("Un Authorized response")
        .prop(
          "error",
          Schema.object()
            .prop("isError", Schema.boolean())
            .prop("message", Schema.string())
            .prop("origin", Schema.string())
            .prop("timestamp", Schema.string())
        )
        .valueOf() as JSONSchema,
      "404": Schema.object()
        .description("Not Found")
        .prop(
          "error",
          Schema.object()
            .prop("isError", Schema.boolean())
            .prop("message", Schema.string())
            .prop("origin", Schema.string())
            .prop("timestamp", Schema.string())
        )
        .valueOf() as JSONSchema,
      "409": Schema.object()
        .description("Error Response")
        .prop(
          "error",
          Schema.object()
            .prop("isError", Schema.boolean())
            .prop("message", Schema.string())
            .prop("origin", Schema.string())
            .prop("timestamp", Schema.string())
        )
        .valueOf() as JSONSchema,
      "500": Schema.object()
        .description("Internal Server Error Response")
        .prop(
          "error",
          Schema.object()
            .prop("isError", Schema.boolean())
            .prop("message", Schema.string())
            .prop("origin", Schema.string())
            .prop("timestamp", Schema.string())
        )
        .valueOf() as JSONSchema,
    };
    return responseType;
  };
  