import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import Tasks from "models/tasks";

type payload = {
  // id?: number;
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

export async function CREATE(
  request: FastifyRequest<{ Body: payload }>,
  reply: FastifyReply
) {
  try {
    const {
    ...rest
    } = request?.body;
    const task = await Tasks.query().insert({
      ...rest
    });
    
    console.log("🚀 ~ user ~ user:", task)
    return handleResponse(request, reply, responseType?.OK, {
      data: { id: task?.id },
    });
  } catch (error: any) {
    console.log("🚀 ~ error:", error)
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
