import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      // Create "Project_Members" table
  await knex.schema.createTable("project_members", (table) => {
    table.increments("id").primary();
    table.integer("project_id").unsigned().references("id").inTable("projects").onDelete("CASCADE");
    table.boolean("is_active");
    table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    table.integer("created_by");
    table.integer("updated_by");
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("project_members");
}

