import {Component, OnDestroy, OnInit} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {FormsModule} from "@angular/forms";
import {MatBadgeModule} from "@angular/material/badge";
import {NotificationService} from "../service/notification.service";
import {NotificationDto} from "../dto/notification-dto";
import {TimeAgoPipe} from "../pipes/time-ago.pipe";
import {ThemeService} from "../service/theme.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [
        MatIconModule,
        MatToolbarModule,
        NgIf,
        NgForOf,
        MatButtonModule,
        RouterLink,
        MatMenuTrigger,
        MatMenu,
        MatMenuItem,
        FormsModule,
        MatBadgeModule,
        TimeAgoPipe
    ],
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuthenticated: boolean = false;
    searchQuery: string = '';
    unreadCount: number = 0;
    notifications: NotificationDto[] = [];
    showNotifications: boolean = false;
    isDarkMode: boolean = false;
    userPicture: string = '';
    private pollInterval: any;

    constructor(private oidcSecurityService: OidcSecurityService,
                private router: Router,
                private notificationService: NotificationService,
                private themeService: ThemeService) {
        this.isDarkMode = this.themeService.isDarkMode();
    }

    ngOnInit(): void {
        this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated}) => {
            this.isAuthenticated = isAuthenticated;
            if (isAuthenticated) {
                this.loadUnreadCount();
                this.pollInterval = setInterval(() => {
                    this.loadUnreadCount();
                }, 30000);
                this.oidcSecurityService.userData$.subscribe(({userData}) => {
                    if (userData) {
                        this.userPicture = userData.picture || '';
                    }
                });
            }
        });
    }

    ngOnDestroy(): void {
        if (this.pollInterval) {
            clearInterval(this.pollInterval);
        }
    }

    loadUnreadCount(): void {
        this.notificationService.getUnreadCount().subscribe({
            next: (count) => {
                this.unreadCount = count;
            }
        });
    }

    onSearch(): void {
        if (this.searchQuery.trim()) {
            this.router.navigate(['/search'], {queryParams: {q: this.searchQuery.trim()}});
        }
    }

    toggleNotifications(): void {
        this.showNotifications = !this.showNotifications;
        if (this.showNotifications && this.notifications.length === 0) {
            this.notificationService.getNotifications().subscribe({
                next: (notifications) => {
                    this.notifications = notifications;
                }
            });
        }
    }

    markAllRead(): void {
        this.notificationService.markAllAsRead().subscribe({
            next: () => {
                this.unreadCount = 0;
                this.notifications.forEach(n => n.read = true);
            }
        });
    }

    onNotificationClick(notification: NotificationDto): void {
        if (!notification.read) {
            this.notificationService.markAsRead(notification.id).subscribe({
                next: () => {
                    notification.read = true;
                    this.unreadCount = Math.max(0, this.unreadCount - 1);
                }
            });
        }
        this.showNotifications = false;
        if (notification.videoId) {
            this.router.navigate(['/video-details', notification.videoId]);
        }
    }

    toggleTheme(): void {
        this.themeService.toggleTheme();
        this.isDarkMode = this.themeService.isDarkMode();
    }

    login() {
        console.log('Login clicked, attempting authorize...');
        this.oidcSecurityService.authorize();
        console.log('authorize() called');
    }

    logOff() {
        this.oidcSecurityService.logoffAndRevokeTokens();
        this.oidcSecurityService.logoffLocal();
    }
}
