import { FastifyReply, FastifyRequest } from 'fastify';
import { handleResponse, responseType } from '@helpers';
import Permissions from 'models/permissions';

export async function GET_BY_ID(
  request: FastifyRequest<{ Params: { id: string | number } }>,
  reply: FastifyReply
) {
  console.log('🚀 ~ GET_BY_ID ~ request:', request?.params?.id);
  try {
    const { id } = request?.params;
    const permission = await Permissions.query()
      .select()
      .where({ id: id })
      .first();

    if (!permission) {
      return handleResponse(request, reply, responseType?.NOT_FOUND, {
        error: { message: 'Permissions not found' },
      });
    }

    return handleResponse(request, reply, responseType?.OK, {
      data: { permission: permission || null },
    });
  } catch {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
