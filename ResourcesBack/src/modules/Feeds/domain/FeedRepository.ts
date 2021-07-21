import { UserId } from "@shared/domain/UserId";
import Feed from "@feed/domain/Feed";
import { SongId } from "@shared/domain/SongId";
import PaginationProps from "@shared/domain/PaginationProps";

export default interface FeedRepository {

    getOneFeed(userId: UserId, songId: SongId, kind: string): Promise<Feed | undefined>;
    getAllofUser(userId: UserId, paginationProps?: PaginationProps): Promise<Feed[]>;
    addOne(feed: Feed): Promise<void>;

}