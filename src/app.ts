import express from 'express';
import cors from 'cors';
// import { connectDB } from './config/database';
// import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import cookieParser from 'cookie-parser';
import { API } from './config/config';
// import chatRoutes from './routes/chatRoutes';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Conectar a la base de datos
// connectDB();

// Rutas
app.use( `${API.baseURL}/auth`, authRoutes);
app.use(`${API.baseURL}/users`, userRoutes);
app.get(`${API.baseURL}`, (_req, res)=>{
    res.send('Hello World');
})
// app.use('/api/chat', chatRoutes);

// Middleware de manejo de errores
// app.use(errorHandler);

export default app;