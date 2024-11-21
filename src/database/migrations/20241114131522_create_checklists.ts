import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      // Create "checklists" table
  await knex.schema.createTable("checklists", (table) => {
    table.increments("id").primary();
    table.integer("task_id").unsigned().references("id").inTable("tasks").onDelete("CASCADE");
    table.string("name", 255).notNullable();
    table.string("description", 255).nullable();
    table.boolean("is_active").defaultTo(false);
    table.integer("created_by");
    table.integer("updated_by");
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("checklists");
}

