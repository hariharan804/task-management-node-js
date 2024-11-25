import { FastifyPluginAsync } from "fastify";

import handler from "controllers/auth/handlers";
import schema from "controllers/auth/schema";

const customerFeedbacks: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.put("/login", { schema: schema.LOGIN }, handler.LOGIN);
  fastify.put("/signup", {schema: schema.SIGNUP}, handler.SIGNUP);
};

export default customerFeedbacks;
