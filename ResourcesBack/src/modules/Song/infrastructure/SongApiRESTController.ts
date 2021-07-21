import { Request, Response } from 'express';

import SongInteractor from '@song/application/SongInteractor';
import SongMongoRepository from '@song/infrastructure/SongMongoRepository';

import { SongDTO } from '@shared/application/DTOs/SongDTO';


export const getSong = async (req: Request, res: Response) => {

    const songInteractor = new SongInteractor( new SongMongoRepository());
    const songId = req.params.id;

    try {
        const song: SongDTO = await songInteractor.getOneSong(songId);
        res.status(200).json(song);
    } catch(err) {
        res.status(400).json(err.message);
    }

}


export const getSongs = async (req: Request, res: Response) => {

    const songInteractor = new SongInteractor( new SongMongoRepository());
    const page = Number(req.query.page); 
    const pageSize= Number(req.query.pageSize);

    try {
        const songs: SongDTO[] = await songInteractor.getAllSongs(page, pageSize);
        res.status(200).json(songs);
    } catch(err) {
        res.status(400).json(err.message);
    }

}