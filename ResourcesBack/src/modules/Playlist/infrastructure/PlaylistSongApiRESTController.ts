import { Request, Response, NextFunction } from 'express';

import PlaylistSongInteractor from "@playlist/application/PlaylistSongInteractor";

import SongIntrnalApiRepository from '@shared/infrastructure/SongInternalApiRepository';
import PlaylistMongoRepository from "@playlist/infrastructure/PlaylistMongoRepository";
import { SongMinDTO } from '@shared/application/DTOs/SongMinDTO';



export const getAllPlaylistSongs = async (req: Request, res: Response, next: NextFunction) => {

    const playlistSongInteractor = new PlaylistSongInteractor( new PlaylistMongoRepository(), new SongIntrnalApiRepository());
    const userId = req.user.id;
    const playlistId = req.params.playlist_id;
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);

    try {
        const playlist: SongMinDTO[] = await playlistSongInteractor.getAllPlaylistSongs(userId, playlistId, page, pageSize);
        res.status(200).json(playlist);
    } catch(err) {
        return next(err);
    }

}


export const addPlaylistSong = async (req: Request, res: Response, next: NextFunction) => {

    const playlistSongInteractor = new PlaylistSongInteractor( new PlaylistMongoRepository(), new SongIntrnalApiRepository());
    const userId = req.user.id;
    const playlistId = req.params.playlist_id;
    const songId = req.params.song_id;

    try {
        await playlistSongInteractor.addPlaylistSong(userId, playlistId, songId);
        res.status(200).json('Song added to your list!');
    } catch(err) {
        return next(err);
    }

}


export const deletePlaylistSong = async (req: Request, res: Response, next: NextFunction) => {

    const playlistSongInteractor = new PlaylistSongInteractor( new PlaylistMongoRepository(), new SongIntrnalApiRepository());
    const userId = req.user.id;
    const playlistId = req.params.playlist_id;
    const songId = req.params.song_id;

    try {
        await playlistSongInteractor.deletePlaylistSong(userId, playlistId, songId);
        res.status(200).json('Song removed from your list!');
    } catch(err) {
        return next(err);
    }

}