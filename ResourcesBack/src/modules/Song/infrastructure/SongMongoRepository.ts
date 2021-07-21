import PaginationProps from '@shared/domain/PaginationProps';
import { SongId } from '@shared/domain/SongId';

import Song from '@song/domain/Song';
import SongRepository from '@song/domain/SongRepository';
import SongSchema, { ISong } from '@song/infrastructure/SongSchema';

export default class SongMongoRepository implements SongRepository {

    async getAll(pagination?: PaginationProps): Promise<Song[]> {

        let fetchedSongs = [];

        if (pagination) {
            const skip = pagination.pageSize * (pagination.page - 1);
            fetchedSongs = await SongSchema.find().skip(skip).limit(pagination.pageSize);
        } else {
            fetchedSongs = await SongSchema.find();
        }

        const songs: Song[] = fetchedSongs.map( (song: ISong) => {
            return new Song(song.id, song.name, song.duration, song.releaseDate, song.link, song.artist);
        });
        return songs;

    }

    async getSome(ids: string[]): Promise<Song[]>{
        const fetchedSongs = await SongSchema.find({ id: { $in: ids } });

        const songs: Song[] = fetchedSongs.map( (song: ISong) => {
            return new Song(song.id, song.name, song.duration, song.releaseDate, song.link, song.artist);
        });
        return songs;
    }

    async getOne(id: SongId): Promise<Song> {
        const song: ISong | null = await SongSchema.findOne({id: id.toString()});
        if(!song) throw new Error('Song not found!');
        return new Song(song.id, song.name, song.duration, song.releaseDate, song.link, song.artist);
    }
    
}