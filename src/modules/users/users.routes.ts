import { type FastifyPluginAsync } from 'fastify';
import { UserGetByIdHandler } from './controllers/getById';

export const userRoutes: FastifyPluginAsync = async (
  fastify
): Promise<void> => {
  fastify.get('/:id', UserGetByIdHandler.schema, UserGetByIdHandler.handle);
  //   fastify.put('/:id', { schema: userCreateSchema }, userCreate);
  // fastify.patch('/update', { schema: userUpdateSchema }, userUpdate);
  // fastify.get('/:id', { schema: userGetByIdSchema }, userGetById);
  // fastify.get('/delete/:id', { schema: userDeleteSchema }, userDelete);
};
