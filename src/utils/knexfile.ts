import * as path from 'path';
import { Knex } from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();
const config: Knex.Config = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_BASE,
    },
    pool: {
        min: 1,
        max: 20,
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
}

module.exports = config;