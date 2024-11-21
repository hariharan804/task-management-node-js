import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      // Create "Projects" table
  await knex.schema.createTable("projects", (table) => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.text("description");
    table.integer("manager_id").unsigned().references("id").inTable("users").onDelete("SET NULL");
    table.boolean("is_active");
    table.integer("created_by");
    table.integer("updated_by");
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("projects");
}

