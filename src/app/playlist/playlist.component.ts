import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlaylistService} from "../service/playlist.service";
import {VideoService} from "../service/video.service";
import {PlaylistDto} from "../dto/playlist-dto";
import {VideoDto} from "../dto/video-dto";
import {VideoCardComponent} from "../video-card/video-card.component";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {forkJoin} from "rxjs";

@Component({
    selector: 'app-playlist',
    standalone: true,
    imports: [
        VideoCardComponent,
        LoadingSpinnerComponent,
        NgForOf,
        NgIf,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './playlist.component.html',
    styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit {

    playlistId!: string;
    playlist: PlaylistDto | null = null;
    videos: VideoDto[] = [];
    loading: boolean = true;

    constructor(private activatedRoute: ActivatedRoute,
                private playlistService: PlaylistService,
                private videoService: VideoService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.playlistId = this.activatedRoute.snapshot.params['playlistId'];
        this.loadPlaylist();
    }

    loadPlaylist(): void {
        this.playlistService.getPlaylist(this.playlistId).subscribe({
            next: (playlist) => {
                this.playlist = playlist;
                if (playlist.videoIds && playlist.videoIds.length > 0) {
                    this.loadVideos(playlist.videoIds);
                } else {
                    this.loading = false;
                }
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    loadVideos(videoIds: string[]): void {
        const videoRequests = videoIds.map(id => this.videoService.getVideo(id));
        forkJoin(videoRequests).subscribe({
            next: (videos) => {
                this.videos = videos;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    deletePlaylist(): void {
        if (this.playlist) {
            this.playlistService.deletePlaylist(this.playlist.id).subscribe({
                next: () => {
                    this.router.navigate(['/playlists']);
                }
            });
        }
    }
}
