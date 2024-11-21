import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import Projects from "models/projects";

export async function DELETE_BY_ID(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request?.params;
    const dataId = await Projects.query().select('id').where({ id: id }).first();
     
    if (!dataId) {
      return handleResponse(request, reply, responseType?.NOT_FOUND, {
        error: { message: "Projects not found" },
      });
    }
    const data:any = await Projects.query().select('id').where({ id: id }).del();

    return handleResponse(request, reply, responseType?.OK, {
      data: {isDeleted: Boolean(data)},
    });
  } catch (error: any) {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
