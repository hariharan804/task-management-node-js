import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import Tasks from "models/tasks";


export async function GET_BY_ID(
  request: FastifyRequest<{ Params: { id: string | number } }>,
  reply: FastifyReply
) {
  console.log("🚀 ~ GET_BY_ID ~ request:", request?.params?.id);
  try {
    const { id } = request?.params;
    const task = await Tasks.query().select().where({ id: id }).first();
 
    if (!task) {
      return handleResponse(request, reply, responseType?.NOT_FOUND, {
        error: { message: "Task not found" },
      });
    }

    return handleResponse(request, reply, responseType?.OK, {
      data: { task: task || null  },
    });
  } catch (error: any) {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}