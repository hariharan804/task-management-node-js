import { FastifyInstance } from 'fastify';
import publicRoutes from './public';
import privateRoutes from './private';

export async function v1Routes(fastify: FastifyInstance) {
  // public routes prefix /api/v1
  fastify.register(publicRoutes);
  fastify.register(privateRoutes);
}
