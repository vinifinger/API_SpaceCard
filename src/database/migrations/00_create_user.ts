import { AES } from 'crypto-ts';
import * as Knex from 'knex';
import { v4 } from "uuid";

export async function up(Knex: Knex) {
    await Knex.schema.createTable('user', table => {
        table.increments('id').primary();
        table.uuid('hash');
        table.string('name');
        table.string('surname');
        table.string('email');
        table.string('facebook');
        table.string('linkedin');
        table.dateTime('date_insert').defaultTo(Knex.fn.now());
        table.integer('status');
        table.string('twitter');
        table.string('password');
        table.string('telephone');
        table.string('instagram');
        table.string('whatsapp');
        table.string('telegram');
        table.string('tiktok');
        table.string('spotify');
        table.string('youtube');
        table.string('wildcard_1');
        table.string('wildcard_2');
        table.string('wildcard_3');
        table.string('end_state');
        table.string('end_city');
        table.string('end_number');
        table.string('end_district');
        table.string('end_cep');
    });

    await Knex('user').insert({
        name: 'nome',
        hash: v4(),
        surname: 'sobrenome',
        email: 'root@root.com',
        facebook: 'facebook',
        linkedin: 'linkedin',
        status: 1,
        twitter: 'twitter',
        password: AES.encrypt('Senha', String(process.env.SECRET_STRING)).toString(),
        telephone: '(51) 99999-9999',
        instagram: 'instagram',
        whatsapp: 'whatsapp',
        telegram: 'telegram',
        tiktok: 'tiktok',
        spotify: 'spotify',
        youtube: 'youtube',
        wildcard_1: 'wildcard_1',
        wildcard_2: 'wildcard_2',
        wildcard_3: 'wildcard_3',
        end_state: 'Endereço Estado',
        end_city: 'Endereço Cidade',
        end_number: 'Endereço Número',
        end_district: 'Endereço Bairro',
        end_cep: 'Endereço CEP'
    });

    return;
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('user');
}