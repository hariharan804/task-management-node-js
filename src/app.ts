import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import dotenv from 'dotenv';
import Fastify from 'fastify';
import { cpus } from 'os';
import { join } from 'path';
import { v1Routes } from './routes';
import { errorResponse, notFoundResponse } from 'helpers/responseHandler';
import { SERVER_PORT, NODE_ENV } from './config/env';
// Load .env file
dotenv.config();
// Set UV_THREADPOOL_SIZE for async operations
process.env.UV_THREADPOOL_SIZE = String(cpus().length);

// Define AppOptions type, extend it with AutoloadPluginOptions
export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const options: AppOptions = {};

// Fastify plugin definition
const app = async (fastify: any, opts: AppOptions) => {
  // Global error handler
  fastify.setSchemaErrorFormatter((errors: any[], dataVar: any) => {
    const message = errors
      .map(
        (err: {
          instancePath: any;
          dataPath: any;
          params: { missingProperty: any };
          message: any;
        }) => {
          const field =
            err.instancePath ||
            err.dataPath ||
            err.params.missingProperty ||
            '';
          return `${field} ${err.message}`;
        }
      )
      .join(', ');
    console.log('🚀 ~ fastify.setSchemaErrorFormatter ~ message:', message);

    return new Error(`Validation failed: ${message} ${dataVar}`);
  });
  fastify.setErrorHandler(errorResponse);
  fastify.setNotFoundHandler(notFoundResponse);
  // Register plugins from the "plugins" directory
  await fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  // Basic health check route
  fastify.get('/', async () => {
    return { message: 'Server Running....' };
  });
  // Health check route
  fastify.get('/health', async () => {
    return {
      status: 'okk',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  });

  // Register API routes (v1)
  await fastify.register(v1Routes, { prefix: '/api/v1' });
};

// Initialize Fastify instance
const fastify = Fastify({
  logger: {
    level: 'error', // Only logs error-level logs
  },
  // logger: {
  //   transport: {
  //     target: 'pino-pretty',
  //     options: {
  //       destination: 1,
  //       colorize: true,
  //       translateTime: 'HH:MM:ss.l',
  //       ignore: 'pid,hostname',
  //     },
  //   },
  // },
});

// Register the app
fastify.register(app, options);

// Listen on specified port
const startServer = async () => {
  // const PORT = process.env.SERVER_PORT;  // Changed to 8080
  try {
    const address = await fastify.listen({
      port: Number(SERVER_PORT),
      host: '0.0.0.0',
    });
    console.log(`Server listening at ${address} Environment: ${NODE_ENV} 🔥`);
  } catch (err: any) {
    if (err?.code === 'EADDRINUSE') {
      console.log(
        `Port ${SERVER_PORT} is already in use, please try again later`
      );
    } else {
      console.error(err);
      process.exit(1);
    }
  }
};

// Call the start server function
startServer();

export default app;
export { app, options };
