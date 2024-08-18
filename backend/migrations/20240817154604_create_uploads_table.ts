import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('uploads', table => {
        table.string('id').primary();
        table.string('filename').defaultTo("");
        table.boolean('is_used').defaultTo(false);
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.string('last_updated_by');
        table.foreign('last_updated_by').references('id').inTable('employees');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('uploads');
}

