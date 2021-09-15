import * as config from '../utils/knexfile';
import Knex from 'knex';

const db = Knex(config);

export { db } 