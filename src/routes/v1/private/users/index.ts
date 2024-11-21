import { FastifyPluginAsync } from "fastify";

import handler from "controllers/users/handlers";
import schema from "controllers/users/schema";

const customerFeedbacks: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", { schema: schema.GET_ALL }, handler.GET_ALL);
  fastify.put("/create", {schema: schema.CREATE}, handler.CREATE);
  fastify.patch("/update", {schema: schema.CREATE}, handler.UPDATE);
  fastify.get("/:id", { schema: schema.GET_BY_ALL }, handler.GET_BY_ID);
  fastify.get("/delete/:id", {schema: schema.DELETE_BY_ALL }, handler.DELETE_BY_ID);
};

export default customerFeedbacks;
