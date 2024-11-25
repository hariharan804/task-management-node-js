import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import Users from "models/users";
import bcrypt from 'bcryptjs';
import { generateAccessToken } from "helpers/functions";

type payload = {
  email: string;
  password: string;
};
export async function LOGIN(
  request: FastifyRequest<{ Body: payload }>,
  reply: FastifyReply
) {
  try {
    const { email, password } = request?.body;

    const user = await Users.query().select().where({ email }).first();

    if (!user) {
      return handleResponse(request, reply, responseType?.NOT_FOUND, {
        error: { message: "User not found" },
      });
    }

    const correctPassword = password
    ? await bcrypt.compare(password, user?.password)
    : null;

    if (!correctPassword) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: { message: "Invalid password" },
      });
    }

    const accessToken = generateAccessToken({userId: user?.id});
    return handleResponse(request, reply, responseType?.OK, {
      data: { accessToken: accessToken, id: user?.id },
    });
  } catch (error: any) {
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
