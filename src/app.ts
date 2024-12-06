import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { env } from "@config";
import Fastify from 'fastify';
// import v1 from './routes/v1';
import { cpus } from 'os';
import { join } from 'path';
import { checkAndUpdateTasks } from './plugins/cron';

// Set UV_THREADPOOL_SIZE for async operations
process.env.UV_THREADPOOL_SIZE = String(cpus().length);

// Define AppOptions type, extend it with AutoloadPluginOptions
export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const options: AppOptions = {};

// Fastify plugin definition
const app = async (fastify: any, opts: AppOptions) => {
  // Register plugins from the "plugins" directory
  await fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  // Health check route
fastify.get('/health', async (request: any, reply: any) => {
  return {
    status: 'okk',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
});

  // Check and update tasks (cron jobs)
  checkAndUpdateTasks();

  // Register API routes (v1)
  // await fastify.register(v1);
};

// Initialize Fastify instance
const fastify = Fastify({ 
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        destination: 1,
        colorize: true,
        translateTime: 'HH:MM:ss.l',
        ignore: 'pid,hostname'
      }
    }
  }
});

// Register the app
fastify.register(app, options);

// Listen on specified port
const startServer = async () => {
  // const PORT = process.env.SERVER_PORT;  // Changed to 8080
  try {
    const address = await fastify.listen({ port: Number(env.SERVER_PORT), host: '0.0.0.0' });
    console.log(`Server listening at ${address} Environment: ${env.NODE_ENV} 🔥`);
  } catch (err: any) {
    if (err?.code === 'EADDRINUSE') {
      console.log(`Port ${env.SERVER_PORT} is already in use, please try again later`);
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
