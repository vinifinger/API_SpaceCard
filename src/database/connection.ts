import * as config from '../utils/knexfile';
import { knex } from 'knex'
import { attachPaginate } from 'knex-paginate';

const db = knex(config)

attachPaginate();

export { db } 