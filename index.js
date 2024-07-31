import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import dbConnection from './utils/index.js';
// import { routeNotFound, errorHandler } from './middlewares/errorMiddlewave.js';
import authRoutes from './routes/auth.js';
import authTask from './routes/tasks.js'

dotenv.config();

dbConnection();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
// app.use(routeNotFound);
// app.use(errorHandler);
app.use('/task',authTask);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
