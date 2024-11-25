import { handleResponse, responseType } from "@helpers";
import { FastifyReply, FastifyRequest } from "fastify";
import Users from "models/users";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "helpers/functions";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "helpers/constant";

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

    const app = initializeApp(firebaseConfig);

    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    const user = await Users.query().select().where({ email }).first();
    console.log("🚀 ~ user:", user);

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
    let userCredential: any;
    try {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
      // console.log("🚀 ~ userCredential:", userCredential);
    } catch (error: any) {
      // console.log("🚀 ~ error:", error);
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: { message: "Invalid user or password" },
      });
    }
    const token = userCredential._tokenResponse.idToken;
    console.log("🚀 ~ token:", token);

    const accessToken = generateAccessToken({ userId: user?.id });
    return handleResponse(request, reply, responseType?.OK, {
      data: { accessToken: accessToken, firebaseToken: token, id: user?.id },
    });
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
