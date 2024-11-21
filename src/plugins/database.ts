import { FastifyPluginCallback } from "fastify";
import knex, { Knex } from "knex";
import configs from "../database/knexfile";
import fp from "fastify-plugin";
import { Model } from "objection";

declare module "fastify" {
  interface FastifyInstance {
    db: Knex;
  }
}

const initConnections: FastifyPluginCallback<any> = async (fastify: any) => {
  try {
    const config = configs[process.env.NODE_ENV || "development"];
    const db = knex(config);
    // console.log("🚀 ~ constinitConnections:FastifyPluginCallback<any>= ~ db:", await db.raw('SELECT 1'))
    Model.knex(db)
    fastify.decorate("db", db);
  } catch (error) {
    console.error("Plugin Error:", error);
  }
};

export default fp(initConnections);
