import {Component, OnInit} from '@angular/core';
import {VideoCardComponent} from "../video-card/video-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {VideoDto} from "../dto/video-dto";
import {VideoService} from "../service/video.service";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-featured',
    imports: [
        VideoCardComponent,
        NgForOf,
        NgIf,
        LoadingSpinnerComponent,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './featured.component.html',
    styleUrl: './featured.component.css'
})
export class FeaturedComponent implements OnInit {

    featuredVideos: Array<VideoDto> = [];
    currentPage: number = 0;
    pageSize: number = 12;
    hasMore: boolean = true;
    loading: boolean = false;
    sortBy: string = 'createdAt';
    selectedCategory: string = '';

    categories: string[] = [
        'MUSIC', 'GAMING', 'EDUCATION', 'ENTERTAINMENT',
        'SPORTS', 'NEWS', 'SCIENCE', 'HOWTO', 'OTHER'
    ];

    constructor(private videoService: VideoService) {
    }

    ngOnInit(): void {
        this.loadVideos();
    }

    loadVideos(): void {
        this.loading = true;
        this.videoService.getAllVideosPaginated(this.currentPage, this.pageSize, this.sortBy, this.selectedCategory)
            .subscribe({
                next: (response) => {
                    if (Array.isArray(response)) {
                        this.featuredVideos = [...this.featuredVideos, ...response];
                        this.hasMore = response.length === this.pageSize;
                    } else if (response && response.content) {
                        this.featuredVideos = [...this.featuredVideos, ...response.content];
                        this.hasMore = !response.last;
                    }
                    this.loading = false;
                },
                error: () => {
                    // Fallback to non-paginated call
                    this.videoService.getAllVideos().subscribe({
                        next: (videos) => {
                            this.featuredVideos = videos;
                            this.hasMore = false;
                            this.loading = false;
                        },
                        error: () => {
                            this.loading = false;
                        }
                    });
                }
            });
    }

    loadMore(): void {
        this.currentPage++;
        this.loadVideos();
    }

    onSortChange(sort: string): void {
        this.sortBy = sort;
        this.currentPage = 0;
        this.featuredVideos = [];
        this.loadVideos();
    }

    onCategoryChange(category: string): void {
        this.selectedCategory = this.selectedCategory === category ? '' : category;
        this.currentPage = 0;
        this.featuredVideos = [];
        this.loadVideos();
    }
}
