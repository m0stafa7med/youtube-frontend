import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-loading-spinner',
    standalone: true,
    imports: [NgIf],
    templateUrl: './loading-spinner.component.html',
    styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent {
    @Input() message: string = '';
}
