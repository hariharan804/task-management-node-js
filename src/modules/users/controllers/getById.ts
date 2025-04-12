import { FastifyRequest, FastifyReply, RouteShorthandOptions } from 'fastify';
import { makeResponseSchema } from 'helpers/schema';
import S from 'fluent-json-schema';
import { handleResponse, responseType } from 'helpers/responseHandler';
import { withTryCatch } from 'helpers/withTryCatch';
import { paramsRequestInfo } from 'mappers/paramsRequest';

export class UserGetByIdHandler {
  static handle: (
    request: FastifyRequest,
    reply: FastifyReply
  ) => Promise<void> = withTryCatch(async (request, reply) => {
    const { id } = paramsRequestInfo(request);
    console.log(
      '🚀 ~ UserGetByIdHandler ~ )=>Promise<void>=withTryCatch ~ id:',
      id
    );

    return handleResponse(request, reply, responseType.OK, {
      data: { id, name: 'John Doe' },
    });
  });

  static schema: RouteShorthandOptions = {
    schema: {
      description: 'Get a user by ID',
      tags: ['User'],
      params: S.object().prop('id', S.string()).required(),
      response: makeResponseSchema(
        S.object().prop(
          'user',
          S.object()
            .prop('id', S.string())
            .prop('role_id', S.number())
            .prop('name', S.string())
            .prop('firebase_id', S.string())
            .prop('email', S.string())
            .prop('is_active', S.boolean())
            .prop('created_by', S.number())
            .prop('updated_by', S.number())
            .prop('created_at', S.string().format('date-time'))
            .prop('updated_at', S.string().format('date-time'))
        )
      ),
    },
  };
}
