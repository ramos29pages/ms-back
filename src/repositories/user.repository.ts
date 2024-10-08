// import { getAllUsers } from './../controllers/user.controller';
// user.repository.ts
import { pool } from '../config/db.config';
import User from '../models/user';

export default class UserRepository {

    async findByEmail(email: string): Promise<User | null> {
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const [rows] = await pool.query(query, [email]);
    
            if (Array.isArray(rows) && rows.length > 0) {
                return rows[0] as User | null;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al buscar usuario por correo electrónico:', error);
            throw error;
        }
    }

    async findByEmailAndPassword(email: string, password: string): Promise<User | null>{
        try {
            const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
            const [rows] = await pool.query(query, [email, password]);
    
            if (Array.isArray(rows) && rows.length > 0) {
                return rows[0] as User | null;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al buscar usuario por correo electrónico:', error);
            throw error;
        }

    }

}
