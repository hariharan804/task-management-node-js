import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import Notifications from "models/notifications";

export async function GET_BY_ID(
  request: FastifyRequest<{ Params: { id: string | number } }>,
  reply: FastifyReply
) {
  console.log("🚀 ~ GET_BY_ID ~ request:", request?.params?.id);
  try {
    const { id } = request?.params;
    const role = await Notifications.query().select().where({ id: id }).first();
 
    if (!role) {
      return handleResponse(request, reply, responseType?.NOT_FOUND, {
        error: { message: "Notifications not found" },
      });
    }

    return handleResponse(request, reply, responseType?.OK, {
      data: { role: role || null  },
    });
  } catch (error: any) {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}