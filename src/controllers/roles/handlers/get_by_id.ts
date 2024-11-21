import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import RoleMasters from "models/roleMasters";

export async function GET_BY_ID(
  request: FastifyRequest<{ Params: { id: string | number } }>,
  reply: FastifyReply
) {
  console.log("🚀 ~ GET_BY_ID ~ request:", request?.params?.id);
  try {
    const { id } = request?.params;
    const role = await RoleMasters.query().select().where({ id: id }).first();
 
    if (!role) {
      return handleResponse(request, reply, responseType?.NOT_FOUND, {
        error: { message: "Role not found" },
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