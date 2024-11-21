import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import ProjectMembers from "models/projectMembers";

export async function GET_BY_ID(
  request: FastifyRequest<{ Params: { id: string | number } }>,
  reply: FastifyReply
) {
  console.log("🚀 ~ GET_BY_ID ~ request:", request?.params?.id);
  try {
    const { id } = request?.params;
    const project = await ProjectMembers.query().select().where({ id: id }).first();
 
    if (!project) {
      return handleResponse(request, reply, responseType?.NOT_FOUND, {
        error: { message: "Projects not found" },
      });
    }

    return handleResponse(request, reply, responseType?.OK, {
      data: { projectMember: project || null  },
    });
  } catch (error: any) {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}