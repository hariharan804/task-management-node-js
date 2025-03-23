import { FastifyReply, FastifyRequest } from 'fastify';
import { handleResponse, responseType } from '@helpers';
import Permissions from 'models/permissions';

type payload = {
  id: number;
  name: string;
  created_by?: number;
  updated_by?: number;
  created_at?: string;
  updated_at?: string;
};

export async function UPDATE(
  request: FastifyRequest<{ Body: payload }>,
  reply: FastifyReply
) {
  try {
    const { id, ...rest } = request?.body;
    const permission: any = await Permissions.query()
      .findById(id)
      .patch({ ...rest });

    return handleResponse(request, reply, responseType?.OK, {
      data: { id: permission?.id },
    });
  } catch {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
