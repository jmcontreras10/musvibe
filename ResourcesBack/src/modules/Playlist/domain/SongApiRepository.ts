import { SongDTO } from "@shared/application/DTOs/SongDTO";
import { SongMinDTO } from "@shared/application/DTOs/SongMinDTO";

export default interface SongApiRepository {

    getSong(id: string): Promise<SongDTO>;
    getSomeSongs(ids: string[]): Promise<SongMinDTO[]>;

}