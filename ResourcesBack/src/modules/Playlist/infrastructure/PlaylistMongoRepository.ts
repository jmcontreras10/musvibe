import Playlist from "@playlist/domain/Playlist";
import PlaylistRepository from "@playlist/domain/PlaylistRepository";
import PaginationProps from "@shared/domain/PaginationProps";
import { PlaylistId } from "@shared/domain/PlaylistId";
import { SongId } from "@shared/domain/SongId";
import { UserId } from "@shared/domain/UserId";
import PlaylistSchema, { IPlaylist } from "@playlist/infrastructure/PlaylistSchema";
import { NotFoundError } from "@shared/domain/Errors/NotFoundError";

export default class PlaylistMongoRepository implements PlaylistRepository {

    async getOne(id: PlaylistId): Promise<Playlist> {

        const playlist: IPlaylist | null = await PlaylistSchema.findOne({ id: id.toString() });

        if(!playlist) throw new NotFoundError('Playlist');

        const songs = playlist.songs?.map(songId => {
            return new SongId(songId);
        });
        
        return new Playlist(playlist.id, playlist.name, playlist.tags, songs, playlist.userId);
    }


    async getAllofUser(userId: UserId, paginationProps?: PaginationProps): Promise<Playlist[]> {        
        
        let fetchedPlaylists = [];

        if (paginationProps) {
            const skip = paginationProps.pageSize * (paginationProps.page - 1);
            fetchedPlaylists = await PlaylistSchema.find({ userId: userId.toString() }).skip(skip).limit(paginationProps.pageSize);
        } else {
            fetchedPlaylists = await PlaylistSchema.find({ userId: userId.toString() });
        }

        const playlists: Playlist[] = fetchedPlaylists.map( (playlist: IPlaylist) => {
            const songs = playlist.songs?.map(songId => {
                return new SongId(songId);
            });
            return new Playlist(playlist.id, playlist.name, playlist.tags, songs, playlist.userId);
        });
        return playlists;

    }


    async insertOne(playlist: Playlist): Promise<void> {

        const toCreatePlaylist = new PlaylistSchema({
            id: playlist.id,
            userId: playlist.userId,
            name: playlist.name,
            tags: playlist.tags,
            songs: playlist.songs
        });
        await toCreatePlaylist.save();

    }


    async updateOne(playlist: Playlist): Promise<void> {

        const fetchedPlaylist: IPlaylist | null = await PlaylistSchema.findOne({ id: playlist.id.toString() });
        if(!fetchedPlaylist) return;
        fetchedPlaylist.name = playlist.name;
        fetchedPlaylist.tags = playlist.tags;
        await fetchedPlaylist.save();

    }


    async deleteOne(id: PlaylistId): Promise<void> {

        await PlaylistSchema.deleteOne({ id: id.toString() });

    }


    async deleteAll(userId: UserId): Promise<void> {
        await PlaylistSchema.deleteMany({ userId: userId.toString() });
    }


    async addSong(playlistId: PlaylistId, songId: SongId): Promise<void> {

        const fetchedPlaylist: IPlaylist | null = await PlaylistSchema.findOne({ id: playlistId.toString() });
        if(!fetchedPlaylist) return;
        if(!fetchedPlaylist.songs) return;
        fetchedPlaylist.songs.push(songId.toString());
        await fetchedPlaylist.save();

    }


    async deleteSong(playlistId: PlaylistId, songId: SongId): Promise<void> {

        const fetchedPlaylist: IPlaylist | null = await PlaylistSchema.findOne({ id: playlistId.toString() });
        if(!fetchedPlaylist) return;
        if(!fetchedPlaylist.songs) return;
        fetchedPlaylist.songs.splice(fetchedPlaylist.songs.findIndex( song => song === songId.toString()),1);
        await fetchedPlaylist.save();

    }

}