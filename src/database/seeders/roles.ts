import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("role_masters").del();

  // Inserts seed entries
  await knex("role_masters").insert([
    {id:1, name: "Manager", created_at: new Date().toISOString(), updated_at: new Date().toISOString()},
    {id:2, name: "Member", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ]);
}
