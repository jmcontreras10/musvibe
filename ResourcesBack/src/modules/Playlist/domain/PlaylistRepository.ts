import { PlaylistId } from '@shared/domain/PlaylistId';
import { SongId } from '@shared/domain/SongId';
import PaginationProps from '@shared/domain/PaginationProps';
import Playlist from '@playlist/domain/Playlist';
import { UserId } from '@shared/domain/UserId';

export default interface PlaylistRepository {

    getOne(id: PlaylistId): Promise<Playlist>;
    getAllofUser(userId: UserId, paginationProps?: PaginationProps): Promise<Playlist[]>;
    insertOne(playlist: Playlist): Promise<void>;
    updateOne(playlist: Playlist): Promise<void>;
    deleteOne(id: PlaylistId): Promise<void>;
    deleteAll(userId: UserId): Promise<void>;

    addSong(playlistId: PlaylistId, songId: SongId): Promise<void>;
    deleteSong(playlistId: PlaylistId, songId: SongId): Promise<void>;

}