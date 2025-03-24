import { FastifyReply, FastifyRequest } from 'fastify';
import { handleResponse, responseType } from 'helpers/responseHandler';
import Users from 'models/users';

type payload = {
  id: number;
  project_id?: number;
  assigned_by?: number;
  assigned_to?: number;
  name: string;
  description?: string;
  is_active?: boolean;
  is_completed?: boolean;
  status?: string;
  estimated_time?: number;
  start_at?: string;
  end_at?: string;
};

export async function UPDATE(
  request: FastifyRequest<{ Body: payload }>,
  reply: FastifyReply
) {
  try {
    const { id, ...rest } = request?.body || {};
    const task: any = await Users.query()
      .findById(id)
      .patch({ ...rest });

    return handleResponse(request, reply, responseType?.OK, {
      data: { id: task?.id },
    });
  } catch {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
