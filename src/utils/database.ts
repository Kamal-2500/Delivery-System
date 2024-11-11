import mysql from "mysql2/promise";
import { configs } from "../configs";

export class DBUtils {
  /**
   * Creates and returns a MySQL connection pool.
   * @returns MySQL connection pool.
   */
  public static getPool(): mysql.Pool {
    return mysql.createPool({
        host: configs.db.host,
        user: configs.db.user,
        password: "",
        database: configs.db.name
      });
  }
}