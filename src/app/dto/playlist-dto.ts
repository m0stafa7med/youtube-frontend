export interface PlaylistDto {
    id: string;
    name: string;
    description: string;
    userId: string;
    videoIds: string[];
    visibility: string;
    createdAt: string;
}
