import { config } from 'dotenv';
const env = process.env.NODE_ENV || 'development';
config({ path: `.env.${env}` });
// config({ path: ".env" });

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  NODE_ENV,
  SERVER_PORT,
  IS_DEVELOPMENT,
}: any = process.env;

export {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  NODE_ENV,
  SERVER_PORT,
  IS_DEVELOPMENT,
};
