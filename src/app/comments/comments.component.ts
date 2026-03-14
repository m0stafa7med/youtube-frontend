import {Component, Input, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CommentService} from "../service/comment.service";
import {UserService} from "../service/user.service";
import {CommentDto} from "../dto/comment-dto";
import {TimeAgoPipe} from "../pipes/time-ago.pipe";

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    imports: [
        MatIcon,
        MatButton,
        MatIconButton,
        NgIf,
        NgForOf,
        FormsModule,
        TimeAgoPipe
    ],
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
    @Input() videoId!: string;

    focused = false;
    commentText: string = '';
    comments: CommentDto[] = [];
    currentUserId: string = '';

    editingCommentId: string = '';
    editText: string = '';
    replyingToCommentId: string = '';
    replyText: string = '';
    expandedReplies: Set<string> = new Set();

    constructor(private commentService: CommentService,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.currentUserId = this.userService.getUserId();
        this.loadComments();
    }

    loadComments(): void {
        this.commentService.getAllComments(this.videoId).subscribe({
            next: (comments) => {
                this.comments = comments;
            }
        });
    }

    addComment(): void {
        if (!this.commentText.trim()) {
            return;
        }
        const commentDto = {
            commentText: this.commentText
        };
        this.commentService.postComment(commentDto, this.videoId).subscribe({
            next: () => {
                this.commentText = '';
                this.focused = false;
                this.loadComments();
            }
        });
    }

    deleteComment(commentId: string): void {
        this.commentService.deleteComment(this.videoId, commentId).subscribe({
            next: () => {
                this.loadComments();
            }
        });
    }

    editComment(comment: CommentDto): void {
        this.editingCommentId = comment.id;
        this.editText = comment.commentText;
    }

    saveEdit(comment: CommentDto): void {
        if (!this.editText.trim()) {
            return;
        }
        const commentDto = {
            commentText: this.editText
        };
        this.commentService.editComment(this.videoId, comment.id, commentDto).subscribe({
            next: () => {
                this.editingCommentId = '';
                this.editText = '';
                this.loadComments();
            }
        });
    }

    cancelEdit(): void {
        this.editingCommentId = '';
        this.editText = '';
    }

    replyToComment(comment: CommentDto): void {
        this.replyingToCommentId = comment.id;
        this.replyText = '';
    }

    submitReply(comment: CommentDto): void {
        if (!this.replyText.trim()) {
            return;
        }
        const commentDto = {
            commentText: this.replyText
        };
        this.commentService.addReply(this.videoId, comment.id, commentDto).subscribe({
            next: () => {
                this.replyingToCommentId = '';
                this.replyText = '';
                this.expandedReplies.add(comment.id);
                this.loadComments();
            }
        });
    }

    cancelReply(): void {
        this.replyingToCommentId = '';
        this.replyText = '';
    }

    toggleReplies(comment: CommentDto): void {
        if (this.expandedReplies.has(comment.id)) {
            this.expandedReplies.delete(comment.id);
        } else {
            this.expandedReplies.add(comment.id);
        }
    }

    cancel(): void {
        this.focused = false;
        this.commentText = '';
    }
}
