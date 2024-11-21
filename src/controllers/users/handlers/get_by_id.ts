import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import Users from "models/users";


export async function GET_BY_ID(
  request: FastifyRequest<{ Params: { id: string | number } }>,
  reply: FastifyReply
) {
  console.log("🚀 ~ GET_BY_ID ~ request:", request?.params?.id);
  try {
    const { id } = request?.params;
    const user = await Users.query().select().where({ id: id }).first();
 
    if (!user) {
      return handleResponse(request, reply, responseType?.NOT_FOUND, {
        error: { message: "User not found" },
      });
    }

    return handleResponse(request, reply, responseType?.OK, {
      data: { user: user || null  },
    });
  } catch (error: any) {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}