import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { Authenticator } from '@shared/infrastructure/AuthMiddleware';

import songRoutes from '@song/infrastructure/SongRouter';
import playlistRoutes from '@playlist/infrastructure/PlaylistRouter';
import feedRoutes from '@feed/infrastructure/FeedRouter';
import { NotAuthorizedError } from '@shared/domain/Errors/NotAuthorizedError';
import { NotFoundError } from '@shared/domain/Errors/NotFoundError';

const app: Application = express();

//  Configurations
app.set('port', 3001 );

//  Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser())

//  Routes
app.use('/songs', songRoutes);
app.use('/playlists', Authenticator, playlistRoutes);
app.use('/feeds', Authenticator, feedRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof NotAuthorizedError) {
        res.status(401).json(err.message);
    }
    else if(err instanceof NotFoundError) {
        res.status(404).json(err.message);
    } else {
        res.status(400).json(err.message);
    }
})

export default app;