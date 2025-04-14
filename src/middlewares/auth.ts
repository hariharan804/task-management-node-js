// middlewares/authMiddleware.ts
import { FastifyRequest, FastifyReply } from 'fastify';

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // const authHeader = request.headers.authorization;
    // console.log('🚀 ~ authHeader:', authHeader);
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return reply.code(401).send({ error: 'Unauthorized' });
    // }
    // const token = authHeader.split(' ')[1];
    // // ✅ Replace this with your own verification logic
    // const user = verifyToken(token); // custom function or service
    // if (!user) {
    //   return reply.code(403).send({ error: 'Forbidden' });
    // }
    // // Optional: attach to request
    // request.user = user;
  } catch {
    return reply.code(401).send({ error: 'Invalid token' });
  }
}
