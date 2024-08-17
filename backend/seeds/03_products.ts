import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    const tableName = "products";

    // Deletes ALL existing entries
    await knex(tableName).del();

    // Inserts seed entries
    await knex(tableName).insert([
        {
            id: 'PRODUCT-1',
            name: 'Coca Cola',
            price: 10000,
            description: 'Coca Cola 1.5L',
            category_id: 'CATEGORY-2',
            image_url: 'https://www.coca-cola.co.uk/content/dam/journey/gb/en/private/holidays/2021/summer/summer-coca-cola.jpg',
            is_archived: false,
            created_at: new Date(),
            updated_at: new Date(),
            last_updated_by: 'EMPLOYEE-1'
        },
        {
            id: 'PRODUCT-2',
            name: 'Fanta',
            price: 10000,
            description: 'Fanta 1.5L',
            category_id: 'CATEGORY-2',
            image_url: 'https://www.coca-cola.co.uk/content/dam/journey/gb/en/private/holidays/2021/summer/summer-coca-cola.jpg',
            is_archived: false,
            created_at: new Date(),
            updated_at: new Date(),
            last_updated_by: 'EMPLOYEE-1'
        }
    ]);
};
