import { AES } from 'crypto-ts';
import { Knex } from 'knex';
import { v4 } from "uuid";

export async function up(Knex: Knex) {
    await Knex.schema.createTable('user', table => {
        table.increments('id').primary();
        table.uuid('hash');
        table.string('name');
        table.string('surname');
        table.string('email');
        table.string('bio');
        table.string('username');
        table.string('password');
        table.boolean('status').defaultTo(1).notNullable();
        table.string('imageUrl');
        table.string('telephone');
        table.dateTime('date_insert').defaultTo(Knex.fn.now());
        table.string('end_state');
        table.string('end_city');
        table.string('end_number');
        table.string('end_district');
        table.string('end_cep');
        table.string('reset_password_token');
    });

    await Knex('user').insert({
        name: 'nome',
        hash: v4(),
        surname: 'sobrenome',
        email: 'root@root.com',
        bio: 'bio',
        username: 'userroot',
        password: AES.encrypt('Senha', String(process.env.SECRET_STRING)).toString(),
        status: 1,
        imageUrl: 'URL da Imagem',
        telephone: '(51) 99999-9999',
        end_state: 'Endereço Estado',
        end_city: 'Endereço Cidade',
        end_number: 'Endereço Número',
        end_district: 'Endereço Bairro',
        end_cep: 'Endereço CEP',
    });

    return;
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('user');
}