import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import { generateAccessToken } from "helpers/functions";
import Users from "models/users";

type payload = {
  // id?: number;
  role_id?: number;
  name?: string;
  firebase_id?: string;
  email?: string;
  is_active?: boolean;
  created_by?: number;
  password: string;
  updated_by?: number;
};

export async function SIGNUP(
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
      password
    } = request?.body;
    const existingUser = await Users.query().select().where({ email }).first();

    if (existingUser) {
      return handleResponse(request, reply, responseType?.NOT_FOUND, {
        error: { message: "User already existing" },
      });
    }

    const user = await Users.query().insert({
      name,
      email,
      created_by,
      updated_by,
      firebase_id,
      is_active,
      role_id,
      password:password
    });
    
    console.log("🚀 ~ user ~ user:", user)
    const accessToken = generateAccessToken({userId: user?.id});

    return handleResponse(request, reply, responseType?.OK, {
      data: { accessToken: accessToken, id: user?.id },
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
