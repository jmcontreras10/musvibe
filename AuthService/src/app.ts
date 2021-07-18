import express, { Application } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';

const app: Application = express();

//  Configurations
app.set('port', 3000 );

//  Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser())

//  Routes
app.use('/auth', authRoutes);
app.use(userRoutes);


export default app;