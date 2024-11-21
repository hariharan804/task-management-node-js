import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import ProjectMembers from "models/projectMembers";

type payload = {
  // id?: number;
  project_id: number;
  user_id: number;
  is_active?: boolean;
  created_by?: number;
  updated_by?: number;
  created_at?: string;
  updated_at?: string;
};

export async function CREATE(
  request: FastifyRequest<{ Body: payload }>,
  reply: FastifyReply
) {
  try {
    const {
    ...rest
    } = request?.body;
    const project = await ProjectMembers.query().insert({
      ...rest
    });
    
    return handleResponse(request, reply, responseType?.OK, {
      data: { id: project?.id },
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
