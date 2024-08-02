import { pool } from "../config/db.config";
import Code from "../models/code";

export default class UserRepository {
  public async findCodeByEmailAndCode(
    email: string,
    code: string
  ): Promise<Code | null> {
    try {
      const query = "SELECT * FROM reset_codes WHERE email = ? AND code = ?";
      const [rows] = await pool.query(query, [email, code]);

      if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as Code | null;
      } else {
        return null;
      }
    } catch (error) {
      console.error(
        "FIND-CODE-BY-EMAIL-AND-CODE-ERRROR:: -> ",
        error
      );
      throw error;
    }
  }

  public async updateCodeByEmailAndCode(email: string, code: string): Promise< Code | null> {
    try {
      const updateQuery = "UPDATE reset_codes SET status = true WHERE email = ? AND code = ?";
      const [rows] = await pool.query(updateQuery, [email, code]);
      if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as Code | null;
      } else {
        return null;
      }

    } catch (error) {
      console.error('UPDATE-CODE-ERROR:: ',error);
      throw error;
    }
  }
}
