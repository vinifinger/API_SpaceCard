import * as config from '../utils/knexfile';
import Knex from 'knex';
import { attachPaginate } from 'knex-paginate';

const db = Knex(config);
attachPaginate();

export { db } 