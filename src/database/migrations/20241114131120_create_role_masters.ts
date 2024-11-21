import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      // Create "role_masters" table
  await knex.schema.createTable("role_masters", (table) => {
    table.increments("id").primary();
    table.text("name");
    table.text("description");
    table.boolean("is_active").defaultTo(true);
    table.integer("created_by");
    table.timestamp("created_at", { useTz: true });
    table.integer("updated_by");
    table.timestamp("updated_at", { useTz: true });
  });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("role_masters");
}

