import {Component, OnInit} from '@angular/core';
import {PlaylistService} from "../service/playlist.service";
import {UserService} from "../service/user.service";
import {PlaylistDto} from "../dto/playlist-dto";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {OidcSecurityService} from "angular-auth-oidc-client";

@Component({
    selector: 'app-playlist-list',
    standalone: true,
    imports: [
        LoadingSpinnerComponent,
        NgForOf,
        NgIf,
        FormsModule,
        RouterLink,
        MatButtonModule,
        MatIconModule,
        MatCardModule
    ],
    templateUrl: './playlist-list.component.html',
    styleUrl: './playlist-list.component.css'
})
export class PlaylistListComponent implements OnInit {

    playlists: PlaylistDto[] = [];
    loading: boolean = true;
    showCreateForm: boolean = false;
    isAuthenticated: boolean = false;

    newPlaylistName: string = '';
    newPlaylistDescription: string = '';
    newPlaylistVisibility: string = 'PUBLIC';

    constructor(private playlistService: PlaylistService,
                private userService: UserService,
                private oidcSecurityService: OidcSecurityService) {
    }

    ngOnInit(): void {
        this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated}) => {
            this.isAuthenticated = isAuthenticated;
            if (isAuthenticated) {
                this.loadPlaylists();
            } else {
                this.loading = false;
            }
        });
    }

    loadPlaylists(): void {
        this.playlistService.getMyPlaylists().subscribe({
            next: (playlists) => {
                this.playlists = playlists;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    toggleCreateForm(): void {
        this.showCreateForm = !this.showCreateForm;
        if (!this.showCreateForm) {
            this.resetForm();
        }
    }

    createPlaylist(): void {
        if (!this.newPlaylistName.trim()) {
            return;
        }

        const playlist: PlaylistDto = {
            id: '',
            name: this.newPlaylistName,
            description: this.newPlaylistDescription,
            userId: '',
            videoIds: [],
            visibility: this.newPlaylistVisibility,
            createdAt: ''
        };

        this.playlistService.createPlaylist(playlist).subscribe({
            next: (created) => {
                this.playlists.push(created);
                this.showCreateForm = false;
                this.resetForm();
            }
        });
    }

    resetForm(): void {
        this.newPlaylistName = '';
        this.newPlaylistDescription = '';
        this.newPlaylistVisibility = 'PUBLIC';
    }
}
