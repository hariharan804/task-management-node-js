import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import RoleMasters from "models/roleMasters";

type payload = {
  id: number;
   name: string;
   description?: string;
   is_active?: boolean;
   created_by?: number;
   updated_by?: number;
   created_at?: string;
   updated_at?: string;
};

export async function UPDATE(
  request: FastifyRequest<{ Body: payload }>,
  reply: FastifyReply
) {
  try {
    const { id, ...rest } = request?.body;
    const role: any = await RoleMasters.query()
      .findById(id)
      .patch({ ...rest });

    return handleResponse(request, reply, responseType?.OK, {
      data: { id: role?.id },
    });
  } catch (error: any) {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
