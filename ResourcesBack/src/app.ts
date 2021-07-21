import express, { Application } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import songRoutes from '@song/infrastructure/SongRouter';
import playlistRoutes from '@playlist/infrastructure/PlaylistRouter';

const app: Application = express();

//  Configurations
app.set('port', 3001 );

//  Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser())

//  Routes
app.use('/songs', songRoutes);
app.use('/playlists', playlistRoutes);

export default app;