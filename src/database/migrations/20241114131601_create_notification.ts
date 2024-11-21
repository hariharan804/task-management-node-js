import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      // Create "notifications" table
  await knex.schema.createTable("notifications", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    table.integer("task_id").unsigned().references("id").inTable("tasks").onDelete("CASCADE");
    table.string("message", 255);
    table.boolean("is_read").defaultTo(false);
    table.integer("created_by");
    table.integer("updated_by");
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("notifications");
}

