import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {VideoDto} from "../dto/video-dto";
import {NgIf} from "@angular/common";
import {TimeAgoPipe} from "../pipes/time-ago.pipe";
import {DurationPipe} from "../pipes/duration.pipe";

@Component({
    selector: 'app-video-card',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        RouterLink,
        NgIf,
        TimeAgoPipe,
        DurationPipe
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
