import { Schema, Document, model } from 'mongoose'; 

import { UUID } from '@shared/domain/UUID';
import { FeedDTO } from '@shared/application/DTOs/FeedDTO';

export interface IFeed extends Document, FeedDTO {
    id: string;
}

const playlisySchema = new Schema<IFeed>({
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
    songId: {
        type: String,
        required: true
    },
    kind: {
        type: String,
        required: true
    },
    data: {
        type: String
    },
});

export default model<IFeed>('Feed', playlisySchema);