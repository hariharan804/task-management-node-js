import { FastifyReply, FastifyRequest } from 'fastify';
import { handleResponse, responseType } from '@helpers';
import RolesPermissionsMapping from 'models/rolesPermissionsMapping';

export async function GET_ALL(
  request: FastifyRequest<{ Querystring: { is_active?: boolean } }>,
  reply: FastifyReply
) {
  try {
    const { is_active = true } = request?.query;

    const baseQuery = RolesPermissionsMapping.query()
      .select()
      .where({ is_active: is_active });

    const [result, overallCount] = await Promise.all([
      baseQuery,
      baseQuery.resultSize(),
    ]);

    return handleResponse(request, reply, responseType?.OK, {
      data: { roles: result, overallCount },
    });
  } catch {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
