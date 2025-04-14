import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env based on environment
const env = process.env.NODE_ENV || 'development';
const envPath = resolve(__dirname, '..', '..', `.env.${env}`);
config({ path: envPath });

console.log('🌱 Loaded environment:', `.env.${env}`);
console.log('🔑 DB Host:', process.env.DB_HOST);

// Destructure environment variables with fallback
const {
  DB_HOST = 'localhost',
  DB_PORT = 5432,
  DB_NAME = 'mydb',
  DB_USERNAME = 'user',
  DB_PASSWORD = 'password',
  DB_DEBUG,
} = process.env;

const migrations = {
  tableName: 'knex_migrations',
  extension: 'mjs',
  directory: './migrations',
  loadExtensions: ['.mjs'],
};

const seeds = {
  extension: 'mjs',
  directory: './seeders',
  loadExtensions: ['.mjs'],
};

const pool = { min: 2, max: 10, idleTimeoutMillis: 10000 };

const connection = {
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USERNAME,
  password: DB_PASSWORD,
};

// Knex configuration map
const configs = {
  development: {
    client: 'postgresql',
    connection: connection,
    pool: pool,
    migrations: migrations,
    seeds: seeds,
    debug: DB_DEBUG === 'true',
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: connection,
    pool: pool,
    migrations: migrations,
    seeds: seeds,
    debug: DB_DEBUG === 'true',
    useNullAsDefault: true,
  },

  production: {
    client: 'postgresql',
    connection: connection,
    pool: pool,
    migrations: migrations,
    seeds: seeds,
    useNullAsDefault: true,
  },
};

export default configs;
