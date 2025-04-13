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
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          scheme: 'bearer',
          description: 'Enter token like: Bearer &lt;token>',
        },
      },
      security: [{ bearerAuth: [] }],
    },
    exposeRoute: true,
  });
  fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',

    // transformStaticHtml: (html: any) => {
    //   console.log('🚀 ~ html:', html);
    //   return html.replace(
    //     '</head>',
    //     '<link rel="stylesheet" type="text/css" href="/public/swagger-ui2.css"></head>'
    //   );
    // },

    // logo: {
    //   type: 'image/png',
    //   content: '/docs/logo.png',
    // },
    // theme: {
    //   favicon: [
    //     {
    //       filename: 'favicon-16x16.png',
    //       rel: 'icon',
    //       sizes: '16x16',
    //       type: 'image/png',
    //       content: '/docs/favicon-16x16.png',
    //     },
    //   ],
    //   css: [
    //     {
    //       filename: 'swagger-ui2.css',
    //       content: '/docs/static/theme/swagger-ui2.css',
    //     },
    //   ], // Link to your custom CSS file
    // },
    uiConfig: {
      docExpansion: 'none', // Collapse all endpoints by default ('none' | 'list' | 'full')
      deepLinking: true, // Allows bookmarking/tagging endpoints via URL
      // displayOperationId: true, // Show the operationId in each operation
      displayRequestDuration: true, // Show how long requests take
      filter: true, // Enable search filter for paths/tags
      showExtensions: true, // Show extensions (x-*) if defined in your OpenAPI spec
      showCommonExtensions: true, // Show common extensions (like x-codeSamples)
      tryItOutEnabled: true, // Enable "Try it out" by default
      persistAuthorization: true, // Retain auth token across page reloads
      showMutatedRequest: true, // Show user-edited request in Try It Out
      // defaultModelsExpandDepth: -1, // Set to -1 to hide schema/model section
      // defaultModelExpandDepth: 1, // Controls how deep models expand (1 = first level only)
      syntaxHighlight: {
        theme: 'agate', // Swagger UI built-in themes: 'monokai', 'agate', etc.
        activated: true,
      },
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
    // transformSpecificationClone: true,
  });
};

export default fp(swaggerPlugin);
