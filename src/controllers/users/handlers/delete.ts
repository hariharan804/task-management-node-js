import { FastifyReply, FastifyRequest } from 'fastify';
import { handleResponse, responseType } from 'helpers/responseHandler';
import { Users } from 'models/users';

export async function userDelete(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request?.params || {};
    const userID = await Users.query().select('id').where({ id: id }).first();

    if (!userID) {
      return handleResponse(request, reply, responseType?.NOT_FOUND, {
        error: { message: 'User not found' },
      });
    }
    const user: any = await Users.query().select('id').where({ id: id }).del();

    return handleResponse(request, reply, responseType?.OK, {
      data: { isDeleted: Boolean(user) },
    });
  } catch {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
