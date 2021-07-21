import { InvalidArgumentError } from '@shared/domain/Errors/InvalidArgumentError';
import { FeedId } from '@shared/domain/FeedId';
import { SongId } from '@shared/domain/SongId';
import { UserId } from '@shared/domain/UserId';

export default class Feed {

    readonly id: FeedId;
    readonly userId: UserId;
    readonly songId: SongId;
    readonly kind: string;
    readonly data?: string |undefined;


    constructor(id: string, songId: string, userId: string, kind: string, data?: string) {
        this.id = new FeedId(id);
        this.userId = new UserId(userId);
        this.songId = new SongId(songId);
        this.kind = kind;
        this.data = data;
    }

    static create( songId: string, userId: string, kind: string, data?: string): Feed {
        if(kind !== 'like') throw new InvalidArgumentError('Invalid kind of feed!')
        return new Feed(FeedId.random().toString(), songId, userId, kind, data);
    }

    toPrimitives() {
        return {
            id: this.id.toString(),
            userId: this.userId.toString(),
            songId: this.songId.toString(),
            kind: this.kind,
            ...(this.data && {artist: this.data.toString()})
        }
    }

}