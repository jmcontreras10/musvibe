import { InvalidArgumentError } from '@shared/domain/Errors/InvalidArgumentError';

import { SongId } from '@shared/domain/SongId';
import { ArtistId } from '@shared/domain/ArtistId';

const dateR = /^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/;
const linkR = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/

export default class Song {

    readonly id: SongId;
    readonly name: string;
    readonly duration: number;
    readonly releaseDate: Date;
    readonly link: string;
    readonly artist?: ArtistId | undefined;

    constructor(id: string, name: string, duration: number, releaseDate: Date, link: string, artist?: string) {
        this.id = new SongId(id);
        this.name = name;
        this.duration = duration;
        this.releaseDate = releaseDate;
        this.link = link;
        if(artist) this.artist = new ArtistId(artist);
    }
    
    static create(name: string, duration: number, releaseDate: string, link: string, artist?: string): Song {

        if (!duration) throw new InvalidArgumentError("Please add a duration for the song!")
        if (duration < 0) throw new InvalidArgumentError("The song cannot have a negative duration!")

        if (!releaseDate) throw new InvalidArgumentError("Please add a duration for the song!")
        if (!dateR.test(releaseDate)) throw new InvalidArgumentError("Invalid date format for the song release date!")

        if (!link) throw new InvalidArgumentError("Please add a duration for the song!")
        if (!linkR.test(link)) throw new InvalidArgumentError("Invalid link format for the song link!")

        return new Song(SongId.random().toString(), name, duration, new Date(releaseDate), link, artist);
    }

    toPrimitives() {
        return {
            id: this.id.toString(),
            name: this.name,
            duration: this.duration,
            releaseDate: this.releaseDate,
            link: this.link,
            ...(this.artist && {artist: this.artist.toString()})
        }
    }

    toMinPrimitives() {
        return {
            id: this.id.toString(),
            name: this.name
        }
    }

};