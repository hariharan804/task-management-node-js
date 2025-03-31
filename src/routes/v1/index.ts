import type { FastifyInstance } from 'fastify';

// eslint-disable-next-line import/order
import userRoutes from './private/users';
// import { readdirSync } from 'fs';
// import { join } from 'path';

// const routesLoader = async (fastify: FastifyInstance, sourceDir: string) => {
//   const directories = readdirSync(sourceDir, { withFileTypes: true })
//     .filter((dirent) => dirent.isDirectory())
//     .map((dirent) => dirent.name);

//   for (const dir of directories) {
//     try {
//       const routeModule = await import(`${sourceDir}/${dir}`);
//       if (routeModule.default) {
//         fastify.register(routeModule.default, { prefix: `/api/v1/${dir}` });
//       } else {
//         console.warn(`⚠️ No default export found in ${dir}`);
//       }
//     } catch (error) {
//       console.error(`❌ Failed to load route: ${dir}`, error);
//     }
//   }
// };

const routes = async (fastify: FastifyInstance) => {
  fastify.register(userRoutes, { prefix: '/api/v1/users' });
};

export default routes;

// export default async function privateRoutes(fastify: FastifyInstance) {
//   const authGroup = fastify.withTypeProvider();

//   authGroup.addHook('preHandler', authenticate); // Apply authentication to all routes

//   // Register multiple private route modules
//   authGroup.register(userRoutes, { prefix: '/users' });
//   authGroup.register(orderRoutes, { prefix: '/orders' });
// }
