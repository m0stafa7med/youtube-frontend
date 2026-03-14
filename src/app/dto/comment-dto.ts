export interface CommentDto {
    id: string;
    commentText: string;
    authorId: string;
    authorFullName: string;
    authorPicture: string;
    createdAt: string;
    parentCommentId: string;
    replies: CommentDto[];
}
