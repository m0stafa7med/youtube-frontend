import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {VideoCardComponent} from "../video-card/video-card.component";
import {VideoDto} from "../dto/video-dto";
import {VideoService} from "../service/video.service";

@Component({
  selector: 'app-history',
    imports: [
        NgForOf,
        VideoCardComponent
    ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
    historyVideos: Array<VideoDto> = [];

    constructor(private videoService: VideoService) {
    }

    ngOnInit(): void {
        this.videoService.getAllVideos().subscribe(response => {
            this.historyVideos = response;
        })
    }
}
