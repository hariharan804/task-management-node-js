import { config } from "dotenv";
import { Knex } from "knex";
import { resolve } from "path";

config({ path: resolve(__dirname, "..", "..", ".env") });

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD }: any =
  process.env;

const configs: IKnexConfig = {
  development: {
    client: "postgresql",
    connection: {
      host: DB_HOST,
      database: DB_NAME,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      port: DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      extension: "ts",
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeders",
    },
    debug: !!process.env.DB_DEBUG,
    useNullAsDefault: true,
  },

  staging: {
    client: "postgresql",
    connection: {
      host: DB_HOST,
      database: DB_NAME,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      port: DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
      extension: ".ts",
    },
    seeds: {
      directory: "./seeders",
    },
    debug: !!process.env.DB_DEBUG,
    useNullAsDefault: true,
  },

  production: {
    client: "postgresql",
    connection: {
      host: DB_HOST,
      database: DB_NAME,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      port: DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
      extension: ".ts",
    },
    seeds: {
      directory: "./seeders",
    },
    useNullAsDefault: true,
  },
};

export default configs;
