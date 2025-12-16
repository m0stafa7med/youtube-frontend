import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {MatSidenavContainer} from "@angular/material/sidenav";
import {Router, RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-home',
    imports: [
        SidebarComponent,
        MatSidenavContainer,
        RouterOutlet
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    constructor(private router: Router) {
        this.router.navigateByUrl('/featured');
    }

    ngOnInit(): void {
    }
}
