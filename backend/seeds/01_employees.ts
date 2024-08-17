import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("employees").del();

    // Inserts seed entries
    await knex("employees").insert([
        {
            id: 'EMPLOYEE-1',
            username: 'admin',
            password: '$2b$10$mVxdO97O1g8lUvmb/MNI5uMrBPpwJAPB7C0VwbdJ.CMrgXNF.x1Va',
            role: 'admin',
        },
        {
            id: 'EMPLOYEE-2',
            username: 'cashier',
            password: '$2b$10$mVxdO97O1g8lUvmb/MNI5uMrBPpwJAPB7C0VwbdJ.CMrgXNF.x1Va',
            role: 'cashier',
        }
    ]);
};
