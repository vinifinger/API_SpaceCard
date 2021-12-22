import { Knex } from 'knex';

export async function up(knex: Knex) {
    await knex.schema.createTable('black_list', table => {
        table.increments('id').primary();
        table.string('hash');
        table.dateTime('date_insert').defaultTo(knex.fn.now());
    });

    return;
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('black_list');
}