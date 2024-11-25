 import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import Checklists from "models/checklists";

export async function GET_BY_ID(
  request: FastifyRequest<{ Params: { id: string | number } }>,
  reply: FastifyReply
) {
  console.log("🚀 ~ GET_BY_ID ~ request:", request?.params?.id);
  try {
    const { id } = request?.params;
    const check = await Checklists.query().select().where({ id: id }).first();
 
    if (!check) {
      return handleResponse(request, reply, responseType?.NOT_FOUND, {
        error: { message: "Checklists not found" },
      });
    }

    return handleResponse(request, reply, responseType?.OK, {
      data: { checklist: check || null  },
    });
  } catch (error: any) {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}