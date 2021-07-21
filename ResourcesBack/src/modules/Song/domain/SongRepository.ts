import PaginationProps from '@shared/domain/PaginationProps';

import { SongId } from '@shared/domain/SongId';
import Song from '@song/domain/Song';

export default interface SongRepository {
    getAll(pagination?: PaginationProps): Promise<Song[]>;
    getSome(ids: string[]): Promise<Song[]>;
    getOne(id: SongId): Promise<Song>;
}