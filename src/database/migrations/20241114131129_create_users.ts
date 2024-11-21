import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      // Create "Users" table
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.integer("role_id").unsigned().references("id").inTable("role_masters").onDelete("SET NULL");
    table.string("name", 255).notNullable();
    table.string("firebase_id", 255).notNullable();
    table.string("password", 255).notNullable();
    table.string("email", 255).unique().notNullable();
    table.boolean("is_active");
    table.integer("created_by");
    table.integer("updated_by");
    table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}

