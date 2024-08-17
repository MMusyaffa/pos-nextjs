import { Knex } from "knex";

const tableName = "categories";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(tableName).del();

    // Inserts seed entries
    await knex(tableName).insert([
        {
            id: 'CATEGORY-1',
            name: 'Food',
            image_url: 'https://www.coca-cola.co.uk/content/dam/journey/gb/en/private/holidays/2021/summer/summer-coca-cola.jpg',
            is_archived: false,
            created_at: new Date(),
            updated_at: new Date(),
            last_updated_by: 'EMPLOYEE-1'
        },
        {
            id: 'CATEGORY-2',
            name: 'Drink',
            image_url: 'https://www.coca-cola.co.uk/content/dam/journey/gb/en/private/holidays/2021/summer/summer-coca-cola.jpg',
            is_archived: false,
            created_at: new Date(),
            updated_at: new Date(),
            last_updated_by: 'EMPLOYEE-1'
        }
    ]);
};
