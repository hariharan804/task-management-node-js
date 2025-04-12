import type { FastifyInstance } from 'fastify';
import { userRoutes } from 'modules/users/users.routes';

export default async function publicRoutes(fastify: FastifyInstance) {
  // public routes prefix /api/v1
  fastify.register(userRoutes, { prefix: '/public-users' });
}
