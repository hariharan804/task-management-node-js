const knex = require('knex');

// const DB_HOST = 'localhost',
//   DB_NAME = 'blog',
//   DB_USERNAME = 'postgres',
//   DB_PASSWORD = '1234',
//   DB_PORT = '5432',
//   DB_DEBUG = false;
const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } =process.env;
// const DB_HOST = 'aws-0-ap-south-1.pooler.supabase.com',
//   DB_NAME = 'postgres',
//   DB_USERNAME = 'postgres.fwnzjmsuzjcmgdsqyxbs',
//   DB_PASSWORD = 'xIdtGkBI4FxpOy3gbuui89u8hbRZAtlL',
//   DB_PORT = 6543,
//   DB_DEBUG = false;

const configs = {
  development: {
    client: 'postgresql',
    connection: {
      host: DB_HOST,
      database: DB_NAME,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      port: DB_PORT,
    },
    pool: {
      min: 0,
      max: 7,
      idleTimeoutMillis: 30000, // Time after which an idle connection is closed
    },
    debug: false,
    useNullAsDefault: true,
    // ...knexSnakeCaseMappers(),
  },
};

async function dropAllTables() {
  const config = configs['development'];
  const db = knex(config);

  if (db) {
    try {
      // Drop all tables in the public schema with CASCADE to handle dependencies
      await db.raw('DROP SCHEMA public CASCADE;');

      // Recreate the schema after dropping
      await db.raw('CREATE SCHEMA public;');

      console.log('All tables dropped successfully.');
    } catch (err) {
      console.error('Error dropping tables:', err);
    } finally {
      await db.destroy();
    }
  } else {
    console.error('Error: Database not found!');
  }
}

dropAllTables();
