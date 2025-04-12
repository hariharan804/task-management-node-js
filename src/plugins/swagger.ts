import swagger, { SwaggerOptions } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';

const swaggerPlugin: FastifyPluginCallback<SwaggerOptions> = async (
  fastify: any
  // options
) => {
  fastify.register(swagger, {
    swagger: {
      info: {
        title: 'Task Management Backend',
        description: 'API documentation',
        version: '0.0.1',
      },
    },
    exposeRoute: true,
  });
  fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true, // Disable deep linking
      displayRequestDuration: true, // Show request duration
      filter: true, // Enable filtering
      tryItOutEnabled: true, // Allow users to try API requests
    },
    uiHooks: {
      onRequest: function (request: any, reply: any, next: any) {
        next();
      },
      preHandler: function (request: any, reply: any, next: () => void) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header: any) => header,
    transformSpecification: (
      swaggerObject: any
      //  request: any, reply: any
    ) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
};

export default fp(swaggerPlugin);
