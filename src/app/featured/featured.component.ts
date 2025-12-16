import {Component, OnInit} from '@angular/core';
import {VideoCardComponent} from "../video-card/video-card.component";
import {NgForOf} from "@angular/common";
import {VideoDto} from "../dto/video-dto";
import {VideoService} from "../service/video.service";

@Component({
    selector: 'app-featured',
    imports: [
        VideoCardComponent,
        NgForOf
    ],
    templateUrl: './featured.component.html',
    styleUrl: './featured.component.css'
})
export class FeaturedComponent implements OnInit {

    featuredVideos: Array<VideoDto> = [];

    constructor(private videoService: VideoService) {
    }

    ngOnInit(): void {
        this.videoService.getAllVideos().subscribe(response => {
            this.featuredVideos = response;
        })
    }

}
