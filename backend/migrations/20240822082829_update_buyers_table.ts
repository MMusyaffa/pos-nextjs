import type { Knex } from "knex";

// Add employee_id column to buyers table
export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('buyers', table => {
    table.string('employee_id').references('id').inTable('employees');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('buyers', table => {
    table.dropColumn('employee_id');
  });
}

