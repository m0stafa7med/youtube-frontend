import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../service/user.service";
import {VideoService} from "../service/video.service";
import {UserDto} from "../dto/user-dto";
import {VideoDto} from "../dto/video-dto";
import {VideoCardComponent} from "../video-card/video-card.component";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-channel',
    standalone: true,
    imports: [
        VideoCardComponent,
        LoadingSpinnerComponent,
        NgForOf,
        NgIf,
        MatButtonModule
    ],
    templateUrl: './channel.component.html',
    styleUrl: './channel.component.css'
})
export class ChannelComponent implements OnInit {

    userId!: string;
    user: UserDto | null = null;
    videos: VideoDto[] = [];
    loading: boolean = true;
    isSubscribed: boolean = false;

    constructor(private activatedRoute: ActivatedRoute,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.userId = this.activatedRoute.snapshot.params['userId'];
        this.loadChannel();
    }

    loadChannel(): void {
        this.loading = true;
        this.userService.getUserProfile(this.userId).subscribe({
            next: (user) => {
                this.user = user;
                this.loadVideos();
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    loadVideos(): void {
        this.userService.getUserVideos(this.userId).subscribe({
            next: (videos) => {
                this.videos = videos;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    subscribe(): void {
        this.userService.subscribeToUser(this.userId).subscribe(() => {
            this.isSubscribed = true;
            if (this.user) {
                this.user.subscriberCount++;
            }
        });
    }

    unsubscribe(): void {
        this.userService.unSubscribeUser(this.userId).subscribe(() => {
            this.isSubscribed = false;
            if (this.user) {
                this.user.subscriberCount--;
            }
        });
    }
}
