import { Request, Response, NextFunction } from 'express';

import SongInternalApiRepository from '@shared/infrastructure/SongInternalApiRepository';
import FeedsInteractor from '@feed/application/FeedsInteractor';
import FeedMongoRepository from '@feed/infrastructure/FeedMongoRepository';
import { FeedDetailDTO } from '@shared/application/DTOs/FeedDetailDTO';



export const getAllFeedtSongs = async (req: Request, res: Response, next: NextFunction) => {

    const feedsInteractor = new FeedsInteractor( new FeedMongoRepository, new SongInternalApiRepository());
    const userId = req.user.id;
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);

    try {
        const feeds: FeedDetailDTO[] = await feedsInteractor.getAllFeeds(userId, page, pageSize);
        res.status(200).json(feeds);
    } catch(err) {
        return next(err);
    }

}


export const likeSong = async (req: Request, res: Response, next: NextFunction) => {

    const feedsInteractor = new FeedsInteractor( new FeedMongoRepository, new SongInternalApiRepository());
    const userId = req.user.id;
    const songId = req.params.song_id;

    try {
        await feedsInteractor.addFeedToSong(userId, songId,'like');
        res.status(200).json('Song liked!');
    } catch(err) {
        return next(err);
    }

}
