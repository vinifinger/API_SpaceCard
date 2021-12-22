import { Knex } from 'knex';

export async function up(Knex: Knex) {
    await Knex.schema.createTable('social_media', table => {
        table.increments('id').primary();
        table.integer('id_user').unique().unsigned().references('id').inTable('user');
        table.string('facebook');
        table.string('linkedin');
        table.string('twitter');
        table.string('instagram');
        table.string('whatsapp');
        table.string('telegram');
        table.string('tiktok');
        table.string('spotify');
        table.string('youtube');
        table.string('wildcard_1');
        table.string('wildcard_2');
        table.string('wildcard_3');
    });

    await Knex('social_media').insert({
        id_user: 1,
        facebook: 'https://www.facebook.com/',
        linkedin: 'https://www.linkedin.com/',
        twitter: 'https://www.twitter.com/',
        instagram: 'https://www.instagram.com/',
        whatsapp: 'https://wa.me/',
        telegram: 'https://t.me/',
        tiktok: 'https://www.tiktok.com/',
        spotify: 'https://open.spotify.com/user/',
        youtube: 'https://www.youtube.com/',
        wildcard_1: 'https://www.wildcard_1.com/',
        wildcard_2: 'https://www.wildcard_2.com/',
        wildcard_3: 'https://www.wildcard_3.com/',
    });

    return;
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('social_media');
}