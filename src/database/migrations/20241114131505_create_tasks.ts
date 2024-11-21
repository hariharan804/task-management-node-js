import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      // Create "Tasks" table
  await knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.integer("project_id").unsigned().references("id").inTable("projects").onDelete("CASCADE");
    table.integer("assigned_by").unsigned().references("id").inTable("users");
    table.integer("assigned_to").unsigned().references("id").inTable("users").onDelete("SET NULL");
    table.string("name", 255).notNullable();
    table.text("description");
    table.boolean("is_active");
    table.boolean("is_completed");
    table.string("status", 50).defaultTo("Pending");
    table.integer("estimated_time");
    table.timestamp("start_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("end_at", { useTz: true }).defaultTo(knex.fn.now());
    table.integer("created_by");
    table.integer("updated_by");
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("tasks");
}

