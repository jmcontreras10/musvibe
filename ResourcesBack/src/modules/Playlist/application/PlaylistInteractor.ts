import { PlaylistId } from "@shared/domain/PlaylistId";
import { InvalidArgumentError } from "@shared/domain/Errors/InvalidArgumentError";
import PaginationProps from "@shared/domain/PaginationProps";

import Playlist from "../domain/Playlist";
import PlaylistRepository from "../domain/PlaylistRepository";
import { UserId } from "@shared/domain/UserId";
import { PlaylistMinDTO } from "@shared/application/DTOs/PlaylistMinDTO";
import { NotFoundError } from "@shared/domain/Errors/NotFoundError";
import { NotAuthorizedError } from "@shared/domain/Errors/NotAuthorizedError";

export default class PlaylistInteractor {

    readonly playlistRepository: PlaylistRepository;

    constructor(playlistRepository: PlaylistRepository) {
        //  Dependency injection
        this.playlistRepository= playlistRepository;
    }

    async getOnePlaylist(userId: string, id: string): Promise<PlaylistMinDTO> {
        const playlist: Playlist = await this.playlistRepository.getOne(new PlaylistId(id));
        console.log(playlist);
        
        
        if(!playlist) throw new NotFoundError('Playlist');
        if(playlist.userId?.toString() !== userId) throw new NotAuthorizedError();

        return playlist.toPrimitives();
    }

    async getAllUserPlaylists(userId: string, page?: number, pageSize?: number): Promise<PlaylistMinDTO[]> {
        let paginationProps: PaginationProps | undefined = undefined;
        if( page && pageSize ) {
            if (page < 0) throw new InvalidArgumentError('Invalid page!');
            if (pageSize < 0) throw new InvalidArgumentError('Invalid page size!');
            paginationProps = {page, pageSize};
        }
        const playlists: Playlist[] = await this.playlistRepository.getAllofUser(new UserId(userId), paginationProps);
        return playlists.map(playlist => {
            return playlist.toPrimitives();
        });
    }

    async createPlaylist(name: string, userId: string, tags: string[]): Promise<void> {
        const playlist = Playlist.create(name, userId, tags);
        await this.playlistRepository.insertOne(playlist);
    }
    
    async updatePlaylistData(id: string, userId: string, name: string, tags: string[]): Promise<void> {
        
        const fetchedPlaylist: Playlist = await this.playlistRepository.getOne(new PlaylistId(id));
        
        if(!fetchedPlaylist) throw new NotFoundError('Playlist');
        if(fetchedPlaylist.userId?.toString() !== userId) throw new NotAuthorizedError();

        fetchedPlaylist.name = name;
        fetchedPlaylist.tags = tags;

        await this.playlistRepository.updateOne(fetchedPlaylist);

    }

    async deletePlaylist(userId: string, id: string): Promise<void> {

        const fetchedPlaylist: Playlist = await this.playlistRepository.getOne(new PlaylistId(id));
        
        if(!fetchedPlaylist) throw new NotFoundError('Playlist');
        if(fetchedPlaylist.userId?.toString() !== userId) throw new NotAuthorizedError();
        
        await this.playlistRepository.deleteOne(new PlaylistId(id));

    }

    async deleteAll(userId: string): Promise<void> {
        await this.playlistRepository.deleteAll(new UserId(userId));
    }

}