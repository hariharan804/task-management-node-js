import knex from 'knex';
import { Model } from 'objection';

import configs from './knexfile';

const config = configs[process.env.NODE_ENV || 'development'];

const db = knex(config);
// Bind Objection.js to Knex
Model.knex(db);
export { db };
