import PaginationProps from "@shared/domain/PaginationProps";
import { UserId } from "@shared/domain/UserId";
import Feed from "@feed/domain/Feed";
import FeedRepository from "@feed/domain/FeedRepository";
import FeedSchema, { IFeed } from "@feed/infrastructure/FeedSchema";
import { SongId } from "@shared/domain/SongId";

export default class FeedMongoRepository implements FeedRepository {

    async getOneFeed(userId: UserId, songId: SongId, kind: string): Promise<Feed | undefined> {
        
        const fetchedFeed: IFeed | null = await FeedSchema.findOne({ userId: userId.toString(), songId: songId.toString(), kind: kind});
        if(!fetchedFeed) return;
        const feed: Feed = new Feed(fetchedFeed.id, fetchedFeed.userId, fetchedFeed.songId, fetchedFeed.kind, fetchedFeed.data);
        return feed;

    }

    async getAllofUser(userId: UserId, paginationProps?: PaginationProps): Promise<Feed[]> { 
        
        let fetchedFeeds = [];

        if (paginationProps) {
            const skip = paginationProps.pageSize * (paginationProps.page - 1);
            fetchedFeeds = await FeedSchema.find({ userId: userId.toString() }).skip(skip).limit(paginationProps.pageSize);
        } else {
            fetchedFeeds = await FeedSchema.find({ userId: userId.toString() });
        }

        const feeds: Feed[] = fetchedFeeds.map( (feed: IFeed) => {
            return new Feed(feed.id, feed.songId, feed.userId, feed.kind, feed.data);
        });
        return feeds;

    }

    async addOne(feed: Feed): Promise<void> {

        const toCreateFeed = new FeedSchema({
            id: feed.id,
            userId: feed.userId.toString(),
            songId: feed.songId.toString(),
            kind: feed.kind,
            data: feed.data
        });
        await toCreateFeed.save();

    }

}