import express from 'express';
import cors from 'cors';
// import { connectDB } from './config/database';
// import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import cookieParser from 'cookie-parser';
import { API } from './config/config';
// import chatRoutes from './routes/chatRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));
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

// app.use(errorHandler);

export default app;