import type { Knex } from "knex";

const tableName = "categories";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.string("id").primary();
    table.string("name");
    table.string("image_url");
    table.boolean("is_archived").defaultTo(false);
    table.datetime("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").defaultTo(knex.fn.now());
    table.string("last_updated_by");
    // foreign key
    table.foreign("last_updated_by").references("id").inTable("employees");
  }
  );
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}

