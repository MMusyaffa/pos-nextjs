import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('categories', table => {
      table.string('upload_id');
      table.foreign('upload_id').references('id').inTable('uploads');
    }
  )
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('categories', table => {
      table.dropForeign('upload_id');
      table.dropColumn('upload_id');
    }
  )
}

