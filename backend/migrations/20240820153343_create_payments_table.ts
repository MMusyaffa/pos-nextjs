import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("payments", (table) => {
    table.string("id").primary();
    table.string("buyer_id").references("buyers.id");
    table.string("employee_id").references("employees.id");
    table.integer("subtotal").defaultTo(0);
    table.integer("service").defaultTo(0);
    table.integer("voucher").defaultTo(0);
    table.integer("total").defaultTo(0);
    table.integer("cash").defaultTo(0);
    table.integer("change").defaultTo(0);
    table.datetime("created_at").defaultTo(knex.fn.now());
    table.string("payment_type");
    table.string("status").defaultTo("waiting");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("payments");
}

