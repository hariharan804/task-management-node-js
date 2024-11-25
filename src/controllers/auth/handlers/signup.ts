import { handleResponse, responseType } from "@helpers";
import bcrypt from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseConfig } from "helpers/constant";
import { generateAccessToken } from "helpers/functions";
import Users from "models/users";

type payload = {
  // id?: number;
  role_id?: number;
  name?: string;
  email: string;
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
      email = "",
      is_active,
      role_id,
      updated_by,
      password,
    } = request?.body;
    const existingUser = await Users.query().select().where({ email }).first();

    if (existingUser) {
      return handleResponse(request, reply, responseType?.NOT_FOUND, {
        error: { message: "User already existing" },
      });
    }
    // Password Hashing
    const hashPassword: string = bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(4)
    );

    const app = initializeApp(firebaseConfig);

    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    let userCredential: any;
    try {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
    const token = userCredential._tokenResponse.idToken;
    const uid = userCredential.user.uid;
    console.log("🚀 ~ uid:", uid, "------", token);
    const user = await Users.query().insert({
      name,
      email,
      created_by,
      updated_by,
      firebase_id: uid,
      is_active,
      role_id,
      password: hashPassword,
    });

    // console.log("🚀 ~ user ~ user:", user);
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
