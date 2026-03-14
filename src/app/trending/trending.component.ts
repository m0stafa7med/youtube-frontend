import {Component, OnInit} from '@angular/core';
import {VideoService} from "../service/video.service";
import {VideoDto} from "../dto/video-dto";
import {VideoCardComponent} from "../video-card/video-card.component";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-trending',
    standalone: true,
    imports: [
        VideoCardComponent,
        LoadingSpinnerComponent,
        NgForOf,
        NgIf
    ],
    templateUrl: './trending.component.html',
    styleUrl: './trending.component.css'
})
export class TrendingComponent implements OnInit {

    trendingVideos: VideoDto[] = [];
    loading: boolean = true;

    constructor(private videoService: VideoService) {
    }

    ngOnInit(): void {
        this.videoService.getTrendingVideos().subscribe({
            next: (videos) => {
                this.trendingVideos = videos;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }
}
