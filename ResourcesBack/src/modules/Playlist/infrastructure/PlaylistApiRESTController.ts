import { NextFunction, Request, Response } from 'express';

import PlaylistInteractor from "@playlist/application/PlaylistInteractor";
import PlaylistMongoRepository from "@playlist/infrastructure/PlaylistMongoRepository";
import { PlaylistMinDTO } from '@shared/application/DTOs/PlaylistMinDTO';

export const getPlaylist = async (req: Request, res: Response, next: NextFunction) => {

    const playlistInteractor = new PlaylistInteractor( new PlaylistMongoRepository());
    const userId = req.user.id;
    const playlistId = req.params.id;

    try {
        const playlist: PlaylistMinDTO = await playlistInteractor.getOnePlaylist(userId, playlistId);
        res.status(200).json(playlist);
    } catch(err) {
        return next(err);
    }

}


export const getAllPlaylistsofUser = async (req: Request, res: Response, next: NextFunction) => {

    const playlistInteractor = new PlaylistInteractor( new PlaylistMongoRepository());
    const userId = req.user.id;
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);

    try {
        const playlists: PlaylistMinDTO[] = await playlistInteractor.getAllUserPlaylists(userId, page, pageSize);
        res.status(200).json(playlists);
    } catch(err) {
        return next(err);
    }

}


export const createPlaylist = async (req: Request, res: Response, next: NextFunction) => {

    const playlistInteractor = new PlaylistInteractor( new PlaylistMongoRepository());
    const userId = req.user.id;
    const { name, tags } = req.body;

    try {
        await playlistInteractor.createPlaylist(name, userId, tags);
        res.status(201).json('Playlist created!');
    } catch(err) {
        return next(err);
    }

}


export const updatePlaylist = async (req: Request, res: Response, next: NextFunction) => {

    const playlistInteractor = new PlaylistInteractor( new PlaylistMongoRepository());
    const userId = req.user.id;
    const playlistId = req.params.id;
    const { name, tags } = req.body;

    try {
        await playlistInteractor.updatePlaylistData(playlistId, userId, name, tags);
        res.status(201).json('Playlist updated!');
    } catch(err) {
        return next(err);
    }

}


export const deletePlaylist = async (req: Request, res: Response, next: NextFunction) => {

    const playlistInteractor = new PlaylistInteractor( new PlaylistMongoRepository());
    const userId = req.user.id;
    const playlistId = req.params.id;

    try {
        await playlistInteractor.deletePlaylist(userId, playlistId);
        res.status(201).json('Playlist deleted!');
    } catch(err) {
        return next(err);
    }

}


export const deleteAllPlaylists = async (req: Request, res: Response, next: NextFunction) => {

    const playlistInteractor = new PlaylistInteractor( new PlaylistMongoRepository());
    const userId = req.user.id;

    try {
        await playlistInteractor.deleteAll(userId);
        res.status(201).json('All playlists deleted!');
    } catch(err) {
        return next(err);
    }

}