import SongInteractor from "@song/application/SongInteractor";
import SongMongoRepository from "./SongMongoRepository";

export const getSomeSongs = async (ids: string[]) => {

    const songInteractor = new SongInteractor( new SongMongoRepository());
    return await songInteractor.getSomeSongs(ids);

}

export const getSong = async (id: string) => {

    const songInteractor = new SongInteractor( new SongMongoRepository());
    return await songInteractor.getOneSong(id);

}
