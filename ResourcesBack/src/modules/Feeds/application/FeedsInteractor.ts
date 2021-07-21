import { InvalidArgumentError } from "@shared/domain/Errors/InvalidArgumentError";
import PaginationProps from "@shared/domain/PaginationProps";

import { SongMinDTO } from "@shared/application/DTOs/SongMinDTO";
import SongApiRepository from "@shared/domain/SongApiRepository";
import FeedRepository from "@feed/domain/FeedRepository";
import { FeedDetailDTO } from "@shared/application/DTOs/FeedDetailDTO";
import { UserId } from "@shared/domain/UserId";
import Feed from "@feed/domain/Feed";;
import { NotFoundError } from "@shared/domain/Errors/NotFoundError";
import { SongDTO } from "@shared/application/DTOs/SongDTO";
import { SongId } from "@shared/domain/SongId";
import { validatePagination } from "@shared/application/PaginationPropsValidator";

export default class FeedsInteractor {

    readonly feedRepository: FeedRepository;
    readonly songApiRepository: SongApiRepository;

    constructor(feedRepository: FeedRepository, songApiRepository: SongApiRepository) {
        //  Dependency injection
        this.feedRepository= feedRepository;
        this.songApiRepository= songApiRepository;
    }


    async getAllFeeds(userId: string, page?: number, pageSize?: number): Promise<FeedDetailDTO[]> {
        const paginationProps: PaginationProps | undefined = validatePagination(page, pageSize);

        const feeds: Feed[] = await this.feedRepository.getAllofUser(new UserId(userId), paginationProps);
        if(feeds.length === 0) return [];

        const ids = feeds.map(feed => {
            return feed.songId.toString();
        })

        const songs: SongMinDTO[] = await this.songApiRepository.getSomeSongs(ids);

        const detailedFeeds: FeedDetailDTO[] = songs.map((song: SongMinDTO)  => {
            const found = feeds.find( feed => feed.songId.toString() === song.id );
            if(!found) throw new Error('Unexpected deletion!')
            return {
                song: song,
                kind: found.kind
            }
        });

        return detailedFeeds;

    }


    async addFeedToSong(userId: string, songId: string, kind: string): Promise<void> {

        const song: SongDTO = await this.songApiRepository.getSong(songId);
        if(!song) throw new NotFoundError('Song');

        const feed = await this.feedRepository.getOneFeed(new UserId(userId), new SongId(songId), kind);
        
        if(feed) throw new InvalidArgumentError('You already liked this song!');

        await this.feedRepository.addOne(Feed.create( songId, userId, kind));

    }

}