import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import Tasks from "models/tasks";

type payload = {
  id: number;
  project_id?: number;
  assigned_by?: number;
  assigned_to?: number;
  name: string;
  description?: string;
  is_active?: boolean;
  is_completed?: boolean;
  status?: string;
  estimated_time?: number;
  start_at?: string;
  end_at?: string;
};

export async function UPDATE(
  request: FastifyRequest<{ Body: payload }>,
  reply: FastifyReply
) {
  try {
    const { id, ...rest } = request?.body;
    const task: any = await Tasks.query()
      .findById(id)
      .patch({ ...rest });

    return handleResponse(request, reply, responseType?.OK, {
      data: { id: task?.id },
    });
  } catch (error: any) {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
