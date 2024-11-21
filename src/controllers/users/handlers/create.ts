import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import Users from "models/users";

type payload = {
  // id?: number;
  role_id?: number;
  name?: string;
  firebase_id?: string;
  email?: string;
  is_active?: boolean;
  created_by?: number;
  updated_by?: number;
};

export async function CREATE(
  request: FastifyRequest<{ Body: payload }>,
  reply: FastifyReply
) {
  try {
    const {
      name,
      created_by,
      email,
      firebase_id,
      is_active,
      role_id,
      updated_by,
    } = request?.body;
    const user = await Users.query().insert({
      name,
      created_by,
      email,
      firebase_id,
      is_active,
      role_id,
      updated_by,
      password:''
    });
    
    console.log("🚀 ~ user ~ user:", user)
    return handleResponse(request, reply, responseType?.OK, {
      data: { id: user?.id },
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
