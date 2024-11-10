import mysql from 'mysql2/promise';
import { configs } from '../configs';

export const pool: mysql.Pool = mysql.createPool({
  host: configs.db.host,
  user: configs.db.user,
  password: "",
  database: configs.db.name
});