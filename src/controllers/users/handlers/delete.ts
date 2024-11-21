import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import Users from "models/users";

export async function DELETE_BY_ID(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request?.params;
    const userID = await Users.query().select('id').where({ id: id }).first();
     
    if (!userID) {
      return handleResponse(request, reply, responseType?.NOT_FOUND, {
        error: { message: "User not found" },
      });
    }
    const user:any = await Users.query().select('id').where({ id: id }).del();

    return handleResponse(request, reply, responseType?.OK, {
      data: {isDeleted: Boolean(user)},
    });
  } catch (error: any) {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
