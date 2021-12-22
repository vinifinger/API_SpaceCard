import * as path from 'path';
import { Knex } from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();
const config: Knex.Config = {
    client: 'mysql2',
    connection: {
        host: '185.201.11.65',
        user: 'u945237655_user',
        password: 'L@sanha123',
        database: 'u945237655_spacecard'
    },
    pool: {
        min: 1,
        max: 20,
      },
    migrations: {
        directory: '../database/migrations'
    },
    useNullAsDefault: true
}

module.exports = config;