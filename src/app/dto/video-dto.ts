export interface VideoDto {
    id: string;
    title: string;
    description: string;
    tags: Array<string>;
    videoUrl: string;
    videoStatus: string;
    thumbnailUrl: string;
    likeCount: number;
    dislikeCount: number;
    viewCount: number;
    createdAt: string;
    duration: number;
    category: string;
    userId: string;
    userFullName: string;
    userPicture: string;
}
