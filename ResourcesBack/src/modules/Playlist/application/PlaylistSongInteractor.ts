import { PlaylistId } from "@shared/domain/PlaylistId";
import { InvalidArgumentError } from "@shared/domain/Errors/InvalidArgumentError";
import PaginationProps from "@shared/domain/PaginationProps";

import Playlist from "../domain/Playlist";
import PlaylistRepository from "../domain/PlaylistRepository";
import { SongMinDTO } from "@shared/application/DTOs/SongMinDTO";
import SongApiRepository from "@playlist/domain/SongApiRepository";
import { SongId } from "@shared/domain/SongId";
import { SongDTO } from "@shared/application/DTOs/SongDTO";
import { NotFoundError } from "@shared/domain/Errors/NotFoundError";
import { NotAuthorizedError } from "@shared/domain/Errors/NotAuthorizedError";

export default class PlaylistSongInteractor {

    readonly playlistRepository: PlaylistRepository;
    readonly songApiRepository: SongApiRepository;

    constructor(playlistRepository: PlaylistRepository, songApiRepository: SongApiRepository) {
        //  Dependency injection
        this.playlistRepository= playlistRepository;
        this.songApiRepository= songApiRepository;
    }


    async getAllPlaylistSongs(userId: string, id: string, page?: number, pageSize?: number): Promise<SongMinDTO[]> {
        
        let paginationProps: PaginationProps | undefined = undefined;
        if( page && pageSize ) {
            if (page < 0) throw new InvalidArgumentError('Invalid page!');
            if (pageSize < 0) throw new InvalidArgumentError('Invalid page size!');
            paginationProps = {page, pageSize};
        }

        const playlist: Playlist = await this.playlistRepository.getOne(new PlaylistId(id));

        if(!playlist) throw new NotFoundError('Playlist');
        if(playlist.userId?.toString() !== userId) throw new NotAuthorizedError();
        if (!playlist.songs) return [];

        const ids: string[] = playlist.songs.map(song => {
            return song.toString();
        });

        const songs: SongMinDTO[] = await this.songApiRepository.getSomeSongs(ids);
        return songs;

    }


    async addPlaylistSong(userId: string, id: string, songId: string): Promise<void> {

        const fetchedPlaylist: Playlist = await this.playlistRepository.getOne(new PlaylistId(id));
        
        if(!fetchedPlaylist) throw new NotFoundError('Playlist');
        if(fetchedPlaylist.userId?.toString() !== userId) throw new NotAuthorizedError();

        const song: SongDTO = await this.songApiRepository.getSong(id);
        if(!song) throw new NotFoundError('Song');

        await this.playlistRepository.addSong(new PlaylistId(id), new SongId(songId));

    }


    async deletePlaylistSong(userId: string, id: string, songId: string): Promise<void> {

        const fetchedPlaylist: Playlist = await this.playlistRepository.getOne(new PlaylistId(id));
        
        if(!fetchedPlaylist) throw new NotFoundError('Playlist');
        if(fetchedPlaylist.userId?.toString() !== userId) throw new NotAuthorizedError();
        
        const song: SongDTO = await this.songApiRepository.getSong(id);
        if(!song) throw new NotFoundError('Song');

        await this.playlistRepository.deleteSong(new PlaylistId(id), new SongId(songId));
    }


}