import { IS_DEVELOPMENT } from 'config/env';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

interface Options {
  data?: any;
  headers?: string | undefined;
  customMessage?: string;
  error?: any;
}

export enum responseType {
  OK = 'OK',
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  NO_CONTENT = 'NO_CONTENT',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_ACCEPTABLE = 'NOT_ACCEPTABLE',
  RATE_LIMIT = 'RATE_LIMIT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',
  BAD_GATEWAY = 'BAD_GATEWAY',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT',
  NOT_FOUND = 'NOT_FOUND',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  CONFLICT = 'CONFLICT',
  PRECONDITION_FAILED = 'PRECONDITION_FAILED',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
}

const httpStatusCodes: Record<
  string,
  { code: number; description: string; message?: string }
> = {
  OK: {
    code: 200,
    message: 'Request successful!',
    description: 'The request has succeeded.',
  },
  CREATED: {
    code: 201,
    message: 'Created successfully!',
    description:
      'The request has been fulfilled, resulting in the creation of a new resource.',
  },
  ACCEPTED: {
    code: 202,
    message: 'Request accepted for processing.',
    description:
      'The request has been accepted for processing, but the processing has not been completed.',
  },
  NO_CONTENT: {
    code: 204,
    message: 'No content to return.',
    description:
      'The server has successfully fulfilled the request and there is no additional content to send in the response payload body.',
  },
  BAD_REQUEST: {
    code: 400,
    message: 'Invalid request.',
    description: 'The server cannot process the request due to a client error.',
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'Authentication required.',
    description:
      'The client must authenticate itself to get the requested response.',
  },
  FORBIDDEN: {
    code: 403,
    message: 'Access denied.',
    description:
      'The client does not have permission to access the requested resource.',
  },
  NOT_FOUND: {
    code: 404,
    message: 'Resource not found.',
    description: 'The requested resource could not be found.',
  },
  METHOD_NOT_ALLOWED: {
    code: 405,
    message: 'Method not allowed.',
    description:
      'The request method is not allowed for the requested resource.',
  },
  NOT_ACCEPTABLE: {
    code: 406,
    message: 'Request not acceptable.',
    description: 'The server is unable to produce a response.',
  },
  CONFLICT: {
    code: 409,
    message: 'Conflict detected.',
    description:
      'The request could not be completed due to a conflict with the current state of the target resource.',
  },
  RATE_LIMIT: {
    code: 429,
    message: 'Rate limit exceeded.',
    description:
      'The user has exceeded the rate limit for the requested resource.',
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Something went wrong.',
    description:
      "The server has encountered a situation it doesn't know how to handle.",
  },
  NOT_IMPLEMENTED: {
    code: 501,
    message: 'Not implemented.',
    description:
      'The server does not support the functionality required to fulfill the request.',
  },
  BAD_GATEWAY: {
    code: 502,
    message: 'Bad gateway.',
    description:
      'The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.',
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    message: 'Service unavailable.',
    description:
      'The server is not ready to handle the request. Common causes of this error include when the server is down for maintenance or is overloaded.',
  },
};

export function handleResponse(
  request: FastifyRequest,
  reply: FastifyReply,
  responseType: responseType,
  options: Options
) {
  const statusInfo = httpStatusCodes?.[responseType || 'NOT_IMPLEMENTED'];
  if (!statusInfo) {
    throw new Error(`Invalid response type: ${responseType}`);
  }

  const {
    headers = 'application/json',
    data = {},
    error,
    customMessage,
  } = options;

  const isError = statusInfo.code >= 400;

  reply.code(statusInfo.code).header('Content-Type', headers);

  return reply.send(
    isError
      ? {
          meta: {
            ...statusInfo,
            isError: true,
            origin: request.url,
            timestamp: new Date(),
            message: customMessage
              ? customMessage
              : IS_DEVELOPMENT
                ? error?.message
                : statusInfo?.message,
          },
        }
      : {
          data: data,
          meta: {
            ...statusInfo,
            message: customMessage || statusInfo?.message,
          },
        }
  );
}

export function notFoundResponse(request: FastifyRequest, reply: FastifyReply) {
  return handleResponse(request, reply, responseType.NOT_FOUND, {
    customMessage: request.method + ': ' + request.url + ' not found!',
  });
}

export function errorResponse(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const statusCode = error.statusCode || 500;
  console.log('🚀 ~ error:', error.message);
  console.log('🚀 ~ error validation :', error);

  if (error.statusCode === 429) {
    return handleResponse(request, reply, responseType.RATE_LIMIT, {
      customMessage: error?.message,
    });
  }

  if (error.validation) {
    return handleResponse(request, reply, responseType.NOT_ACCEPTABLE, {
      ...(IS_DEVELOPMENT ? { customMessage: error?.message } : {}),
    });
  }

  if (statusCode === 405) {
    return handleResponse(request, reply, responseType.METHOD_NOT_ALLOWED, {
      customMessage: `Method ${request.method} not allowed on ${request.url}`,
    });
  }

  return handleResponse(request, reply, responseType.INTERNAL_SERVER_ERROR, {
    ...(IS_DEVELOPMENT ? { customMessage: error?.message } : {}),
  });
}
