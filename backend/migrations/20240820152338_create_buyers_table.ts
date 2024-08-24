import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("buyers", (table) => {
    table.string("id").primary();
    table.string("name").defaultTo("buyer");
    table.datetime("created_at").defaultTo(knex.fn.now());
    table.string("order_type");
    table.string("status").defaultTo("waiting");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("buyers");
}

