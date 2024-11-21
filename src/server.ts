// import Fastify from 'fastify';
// import app, {options} from './app';  

// import { cpus } from 'os'; // Set the UV_THREADPOOL_SIZE for async operations
// process.env.UV_THREADPOOL_SIZE = String(cpus().length);

// const fastify = Fastify({
//   logger: true, // Enable logging
// });

// // Register the app plugin
// fastify.register(app, options);

// // Start the server
// const startServer = async (): Promise<void> => {
//   try {
//     const PORT = Number(process.env.PORT) || 6000;
//     const HOST = '0.0.0.0';

//     await fastify.listen({ port: PORT, host: HOST });
//     console.log(`Server is running at http://${HOST}:${PORT}`);
//   } catch (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
// };

// startServer();
