import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {VideoCardComponent} from "../video-card/video-card.component";
import {VideoDto} from "../dto/video-dto";
import {VideoService} from "../service/video.service";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-history',
    imports: [
        NgForOf,
        NgIf,
        VideoCardComponent,
        MatIcon
    ],
    templateUrl: './history.component.html',
    styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
    historyVideos: Array<VideoDto> = [];
    isAuthenticated: boolean = false;
    isLoading: boolean = true;

    constructor(
        private videoService: VideoService,
        private oidcSecurityService: OidcSecurityService
    ) {}

    ngOnInit(): void {
        this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated}) => {
            this.isAuthenticated = isAuthenticated;
            if (isAuthenticated) {
                this.videoService.getHistory().subscribe({
                    next: (response) => {
                        this.historyVideos = response;
                        this.isLoading = false;
                    },
                    error: () => {
                        this.isLoading = false;
                    }
                });
            } else {
                this.isLoading = false;
            }
        });
    }
}
