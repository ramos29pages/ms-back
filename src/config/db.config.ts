// db.config.ts
import { createPool } from 'mysql2/promise';

// Configuración de la conexión a la base de datos MySQL
const dbConfig = {
  host: 'localhost',      // Host de la base de datos
  user: 'root',     // Usuario de la base de datos
  password: '', // Contraseña del usuario de la base de datos
  database: 'pruebas', // Nombre de la base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Crear un pool de conexiones
export const pool = createPool(dbConfig);