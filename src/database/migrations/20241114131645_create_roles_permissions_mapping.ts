import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      // Create "roles_permissions_mapping" table
  await knex.schema.createTable("roles_permissions_mapping", (table) => {
    table.increments("id").primary();
    table.integer("role_id").references("id").inTable("role_masters");
    table.integer("permission_id").references("id").inTable("permissions");
    table.boolean("is_active").defaultTo(true);
    table.integer("created_by");
    table.timestamp("created_at", { useTz: true });
    table.integer("updated_by");
    table.timestamp("updated_at", { useTz: true });
  });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("roles_permissions_mapping");
}

