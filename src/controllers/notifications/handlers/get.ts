import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import Notifications from "models/notifications";

export async function GET_ALL(
  request: FastifyRequest<{ Querystring: { is_active?: boolean } }>,
  reply: FastifyReply
) {
  try {
    const { is_active = true } = request?.query;
 
    let baseQuery =  Notifications.query().select().where({ is_active: is_active });
    
    const [result, overallCount] = await Promise.all([
      baseQuery,
      baseQuery.resultSize(),
    ]);

    return handleResponse(request, reply, responseType?.OK, {
      data:{ notifications: result, overallCount },
    });
  } catch (error: any) {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
