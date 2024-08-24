import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("purchases", (table) => {
    table.string("buyer_id").references("buyers.id");
    table.string("employee_id").references("employees.id");
    table.string("product_id").references("products.id");
    table.integer("quantity").defaultTo(0);
    table.integer("subtotal_each").defaultTo(0);
    table.datetime("created_at").defaultTo(knex.fn.now());
    table.string("status").defaultTo("waiting");

    table.primary(["buyer_id", "employee_id", "product_id"]); 
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("purchases");
}

