import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../service/video.service";
import {VideoDto} from "../dto/video-dto";
import {VideoCardComponent} from "../video-card/video-card.component";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-search-results',
    standalone: true,
    imports: [
        VideoCardComponent,
        LoadingSpinnerComponent,
        NgForOf,
        NgIf
    ],
    templateUrl: './search-results.component.html',
    styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {

    searchQuery: string = '';
    videos: VideoDto[] = [];
    loading: boolean = false;
    currentPage: number = 0;
    pageSize: number = 20;
    hasMore: boolean = true;

    constructor(private activatedRoute: ActivatedRoute,
                private videoService: VideoService) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.searchQuery = params['q'] || '';
            if (this.searchQuery) {
                this.currentPage = 0;
                this.videos = [];
                this.searchVideos();
            }
        });
    }

    searchVideos(): void {
        this.loading = true;
        this.videoService.searchVideos(this.searchQuery, this.currentPage, this.pageSize).subscribe({
            next: (response) => {
                if (Array.isArray(response)) {
                    this.videos = [...this.videos, ...response];
                    this.hasMore = response.length === this.pageSize;
                } else if (response && response.content) {
                    this.videos = [...this.videos, ...response.content];
                    this.hasMore = !response.last;
                }
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    loadMore(): void {
        this.currentPage++;
        this.searchVideos();
    }
}
