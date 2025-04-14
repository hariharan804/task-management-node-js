import { FastifyRequest, FastifyReply, RouteShorthandOptions } from 'fastify';
import { makeResponseSchema } from 'helpers/schema';
import S from 'fluent-json-schema';
import { handleResponse, responseType } from 'helpers/responseHandler';
import { withTryCatch } from 'helpers/withTryCatch';
import { paramsRequestInfo } from 'mappers/paramsRequest';
import { TableName } from 'models/tableName';

export class UserGetByIdHandler {
  static handle: (
    request: FastifyRequest,
    reply: FastifyReply
  ) => Promise<void> = withTryCatch(async (request, reply) => {
    const { id } = paramsRequestInfo(request);
    // const user = await Users.query().select().where({ id: id }).first();
    const data = await TableName.query().select();

    // console.log(
    //   '🚀 ~ UserGetByIdHandler ~ )=>Promise<void>=withTryCatch ~ user:',
    //   user
    // );
    return handleResponse(request, reply, responseType.OK, {
      data: { role_id: [{ role_id: data }] },
    });
  });

  static schema: RouteShorthandOptions = {
    attachValidation: true,
    schema: {
      description: 'Get a user by ID',
      tags: ['User'],
      params: S.object().prop('id', S.string()).required(),
      response: makeResponseSchema(
        S.object()
          .prop('id', S.string())
          .prop(
            'roleId',
            S.anyOf([
              S.array(), // array of anything
              S.object(), // object with any structure
              S.number(), // number
            ])
          )
          .prop('name', S.string())
          .prop('firebase_id', S.string())
          .prop('email', S.string())
          .prop('is_active', S.boolean())
          .prop('created_by', S.number())
          .prop('updated_by', S.number())
          .prop('created_at', S.string().format('date-time'))
          .prop('updated_at', S.string().format('date-time'))
      ),
    },
  };
}
