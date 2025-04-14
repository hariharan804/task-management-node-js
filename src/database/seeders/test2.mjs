export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('table_name').del();

  // Inserts seed entries
  await knex('table_name').insert([
    { id: 1, colName: 'Value1' },
    { id: 2, colName: 'Value2' },
    { id: 3, colName: 'Value3' },
  ]);
};
