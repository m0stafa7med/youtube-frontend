import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'app-not-found',
    imports: [
        RouterLink,
        MatIcon,
        MatButton
    ],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
}
