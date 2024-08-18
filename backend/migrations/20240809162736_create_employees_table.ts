import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("employees", (table) => {
    table.string("id").primary();
    table.string("username");
    table.string("password");
    table.string("role");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("employees");
}

