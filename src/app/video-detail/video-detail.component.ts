import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VideoService} from "../service/video.service";
import {UserService} from "../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PlaylistService} from "../service/playlist.service";
import {ReportService} from "../service/report.service";
import {PlaylistDto} from "../dto/playlist-dto";
import {ReportDto} from "../dto/report-dto";

@Component({
    selector: 'app-video-detail',
    templateUrl: './video-detail.component.html',
    styleUrls: ['./video-detail.component.css'],
    standalone: false
})
export class VideoDetailComponent implements OnInit {

    videoId!: string;
    videoUrl!: string;
    videoTitle!: string;
    videoDescription!: string;
    tags: Array<string> = [];
    videoAvailable: boolean = false;
    likeCount: number = 0;
    dislikeCount: number = 0;
    viewCount: number = 0;
    showSubscribeButton: boolean = true;
    showUnSubscribeButton: boolean = false;

    videoUserId: string = '';
    userFullName: string = '';
    userPicture: string = '';
    subscriberCount: number = 0;
    createdAt: string = '';
    currentUserId: string = '';
    isOwner: boolean = false;

    showReportMenu: boolean = false;
    showPlaylistMenu: boolean = false;
    userPlaylists: PlaylistDto[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private videoService: VideoService,
                private userService: UserService,
                private matSnackBar: MatSnackBar,
                private router: Router,
                private playlistService: PlaylistService,
                private reportService: ReportService) {
        this.videoId = this.activatedRoute.snapshot.params['videoId'];
        this.currentUserId = this.userService.getUserId();
        this.videoService.getVideo(this.videoId).subscribe(data => {
            this.videoUrl = data.videoUrl;
            this.videoTitle = data.title;
            this.videoDescription = data.description;
            this.tags = data.tags;
            this.videoAvailable = true;
            this.likeCount = data.likeCount;
            this.dislikeCount = data.dislikeCount;
            this.viewCount = data.viewCount;
            this.videoUserId = data.userId;
            this.userFullName = data.userFullName;
            this.userPicture = data.userPicture;
            this.createdAt = data.createdAt;
            this.isOwner = this.currentUserId === data.userId;

            if (data.userId) {
                this.userService.getUserProfile(data.userId).subscribe(user => {
                    this.subscriberCount = user.subscriberCount;
                });
            }
        });
    }

    ngOnInit(): void {
    }

    likeVideo() {
        this.videoService.likeVideo(this.videoId).subscribe(data => {
            this.likeCount = data.likeCount;
            this.dislikeCount = data.dislikeCount;
        });
    }

    disLikeVideo() {
        this.videoService.disLikeVideo(this.videoId).subscribe(data => {
            this.likeCount = data.likeCount;
            this.dislikeCount = data.dislikeCount;
        });
    }

    subscribeToUser() {
        this.userService.subscribeToUser(this.videoUserId).subscribe(data => {
            this.showUnSubscribeButton = true;
            this.showSubscribeButton = false;
            this.subscriberCount++;
        });
    }

    unSubscribeToUser() {
        this.userService.unSubscribeUser(this.videoUserId).subscribe(data => {
            this.showUnSubscribeButton = false;
            this.showSubscribeButton = true;
            this.subscriberCount--;
        });
    }

    shareVideo(): void {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            this.matSnackBar.open('Link copied to clipboard!', 'OK', {duration: 3000});
        });
    }

    deleteVideo(): void {
        this.videoService.deleteVideo(this.videoId).subscribe({
            next: () => {
                this.matSnackBar.open('Video deleted successfully', 'OK', {duration: 3000});
                this.router.navigate(['/']);
            },
            error: () => {
                this.matSnackBar.open('Failed to delete video', 'OK', {duration: 3000});
            }
        });
    }

    reportVideo(): void {
        const report: ReportDto = {
            id: '',
            targetId: this.videoId,
            targetType: 'VIDEO',
            reason: 'Inappropriate content',
            createdAt: ''
        };
        this.reportService.submitReport(report).subscribe({
            next: () => {
                this.matSnackBar.open('Video reported. Thank you for your feedback.', 'OK', {duration: 3000});
                this.showReportMenu = false;
            },
            error: () => {
                this.matSnackBar.open('Failed to report video', 'OK', {duration: 3000});
            }
        });
    }

    togglePlaylistMenu(): void {
        this.showPlaylistMenu = !this.showPlaylistMenu;
        if (this.showPlaylistMenu && this.userPlaylists.length === 0 && this.currentUserId) {
            this.playlistService.getUserPlaylists(this.currentUserId).subscribe({
                next: (playlists) => {
                    this.userPlaylists = playlists;
                }
            });
        }
    }

    addToPlaylist(playlistId: string): void {
        this.playlistService.addVideoToPlaylist(playlistId, this.videoId).subscribe({
            next: () => {
                this.matSnackBar.open('Added to playlist', 'OK', {duration: 3000});
                this.showPlaylistMenu = false;
            },
            error: () => {
                this.matSnackBar.open('Failed to add to playlist', 'OK', {duration: 3000});
            }
        });
    }
}
