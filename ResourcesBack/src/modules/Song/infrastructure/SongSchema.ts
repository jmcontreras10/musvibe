import { Schema, Document, model } from 'mongoose'; 

import { UUID } from '@shared/domain/UUID';
import { SongDTO } from '@shared/application/DTOs/SongDTO';

export interface ISong extends Document, SongDTO {
    id: string;
}

const songSchema = new Schema<ISong>({
    id: {
        type: String, 
        default: UUID.random(),
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    duration: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    artist: {
        type: String
    }
});

export default model<ISong>('Song', songSchema);