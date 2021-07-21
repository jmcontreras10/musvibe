import { Schema, Document, model } from 'mongoose'; 

import { UUID } from '@shared/domain/UUID';
import { PlaylistDTO } from '@shared/application/DTOs/PlaylistDTO';

export interface IPlaylist extends Document, PlaylistDTO {
    id: string;
}

const playlisySchema = new Schema<IPlaylist>({
    id: {
        type: String, 
        default: UUID.random(),
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    songs: {
        type: [String],
        required: true
    },
});

export default model<IPlaylist>('Playlist', playlisySchema);