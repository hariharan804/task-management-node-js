import { type FastifyReply, type FastifyRequest } from 'fastify';
import { handleResponse, responseType } from 'helpers/responseHandler';
import { Users } from 'models/users';

type Payload = {
  role_id?: number;
  name?: string;
  firebase_id?: string;
  email?: string;
  is_active?: boolean;
  created_by?: number;
  updated_by?: number;
};

export async function userCreate(
  request: FastifyRequest<{ Body: Payload }>,
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
    } = request.body;

    const user = await Users.query().insertAndFetch({
      name,
      created_by,
      email,
      firebase_id,
      is_active: is_active ?? true, // Default to `true` if undefined
      role_id,
      updated_by,
      password: '', // Consider hashing if needed
    });

    console.debug('🚀 ~ User Created:', user);

    return handleResponse(request, reply, responseType.OK, {
      data: { id: user.id },
    });
  } catch (error: any) {
    return handleResponse(request, reply, responseType.INTERNAL_SERVER_ERROR, {
      error,
    });
  }
}
