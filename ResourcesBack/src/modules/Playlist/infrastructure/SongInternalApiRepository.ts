import SongApiRepository from "@playlist/domain/SongApiRepository";
import { SongDTO } from "@shared/application/DTOs/SongDTO";
import { SongMinDTO } from "@shared/application/DTOs/SongMinDTO";
import { getSomeSongs, getSong } from "@song/infrastructure/SongInternalApiController";

export default class SongIntrnalApiRepository implements SongApiRepository{
    
    getSong(id: string): Promise<SongDTO> {
        return getSong(id);
    }

    getSomeSongs(ids: string[]): Promise<SongMinDTO[]> {
        return getSomeSongs(ids);
    }
    
}