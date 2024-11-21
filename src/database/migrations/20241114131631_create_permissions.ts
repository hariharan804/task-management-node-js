import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      // Create "permissions" table
  await knex.schema.createTable("permissions", (table) => {
    table.increments("id").primary();
    table.text("title");
    table.boolean("read").defaultTo(false);
    table.boolean("create").defaultTo(false);
    table.boolean("delete").defaultTo(false);
    table.boolean("update").defaultTo(false);
    table.boolean("is_active").defaultTo(true);
    table.integer("created_by");
    table.timestamp("created_at", { useTz: true });
    table.integer("updated_by");
    table.timestamp("updated_at", { useTz: true });
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("permissions");

}

