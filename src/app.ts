import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import Fastify, { FastifyPluginAsync } from "fastify";
import v1 from "./routes/v1";
import { cpus } from "os";
import { join } from "path";
import { checkAndUpdateTasks } from "plugins/cron";

process.env.UV_THREADPOOL_SIZE = String(cpus().length);

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Register plugins from the "plugins" directory
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });
  checkAndUpdateTasks()
  // Register API routes
  void fastify.register(v1);
};

// Initialize Fastify instance
const fastify = Fastify({
  // logger: true, // Enable logging
});

// Register the app
void fastify.register(app, options);

// Start the server
const start = async () => {
  try {
    const PORT = process.env.PORT || 6000; // Use port from environment or default to 6000
  const server =  await fastify.listen({ port: Number(PORT), host: "0.0.0.0" }); // Ensure it listens on all network interfaces
    fastify.log.info(`Fastify Server listening on port ${PORT}`);
    console.log( `🚀 Fastify Server listening on port ${PORT} 🔥 `, server);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();

export default app;
export { app, options };
