// database.ts (Dentro de la carpeta 📂utils)
import { pool } from '../config/db.config';

export const query = async (sql: string, values?: any[]) => {
  const [results] = await pool.query(sql, values);
  return results;
};

// const users = await query('SELECT * FROM users');
