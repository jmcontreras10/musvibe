export interface SongDTO {
    id: string;
    name: string;
    duration: number;
    releaseDate: Date;
    link: string;
    artist?: string | undefined;
}