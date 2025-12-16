import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {VideoDto} from "../dto/video-dto";

@Component({
    selector: 'app-video-card',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        RouterLink
    ],
    templateUrl: './video-card.component.html',
    styleUrl: './video-card.component.css'
})
export class VideoCardComponent implements OnInit {

    @Input()
    video!: VideoDto;

    constructor() {
    }

    ngOnInit(): void {
    }
}
