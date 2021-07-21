import { InvalidArgumentError } from '@shared/domain/Errors/InvalidArgumentError';
import { PlaylistId } from '@shared/domain/PlaylistId';
import { SongId } from '@shared/domain/SongId';
import { UserId } from '@shared/domain/UserId';

export default class Playlist {

    readonly id: PlaylistId;
    public name: string;
    public tags: string[];
    public songs?: SongId[];
    readonly userId?: UserId | undefined;

    constructor(id: string,  name: string, tags: string[], songs?: SongId[], userId?: string) {
        this.id = new PlaylistId(id);
        this.name = name;
        this.tags = tags;
        this.songs = songs;
        this.userId = userId ? new UserId(userId): undefined;
    }

    static create( name: string, userId: string, tags: string[]): Playlist {
        if(!Array.isArray(tags)) throw new InvalidArgumentError('The tags must be a strings array!')
        return new Playlist(PlaylistId.random().toString(), name, tags, [], userId);
    }

    toPrimitives() {
        return {
            id: this.id.toString(),
            userId: this.userId?.toString(),
            name: this.name,
            tags: this.tags,
            songs: this.songs?.map(song => {
                return song.toString();
            })
        }
    }

}