export interface PlaylistDTO {
    id: string;
    name: string;
    tags: string[];
    songs?: string[] | undefined;
    userId?: string | undefined;
}