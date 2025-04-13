declare module 'fastify' {
  interface FastifyInstance {
    knex: Knex;
  }
}

import { db } from 'database';
import fp from 'fastify-plugin';
import { Knex } from 'knex';

async function dbConnector(fastify: any) {
  try {
    await db.raw('select 1+1 as result');
    console.log('✅ Database connection established successfully!');
    fastify.decorate('knex', db);
  } catch (err) {
    console.log('🚀 ~ dbConnector ~ err:', err);
  }
}

export default fp(dbConnector);
