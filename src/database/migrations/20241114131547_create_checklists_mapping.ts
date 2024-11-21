import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      // Create "checklists_mapping" table
  await knex.schema.createTable("checklists_mapping", (table) => {
    table.increments("id").primary();
    table.integer("task_id").unsigned().references("id").inTable("tasks");
    table.integer("checklist_id").unsigned().references("id").inTable("checklists");
    table.boolean("is_checked").defaultTo(false);
    table.integer("created_by");
    table.integer("updated_by");
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("checklists_mapping");
}

