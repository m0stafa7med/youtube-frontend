import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlaylistDto} from "../dto/playlist-dto";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PlaylistService {

    constructor(private httpClient: HttpClient) {
    }

    createPlaylist(playlist: PlaylistDto): Observable<PlaylistDto> {
        return this.httpClient.post<PlaylistDto>(`${environment.apiUrl}/playlists`, playlist);
    }

    getPlaylist(id: string): Observable<PlaylistDto> {
        return this.httpClient.get<PlaylistDto>(`${environment.apiUrl}/playlists/${id}`);
    }

    getUserPlaylists(userId: string): Observable<PlaylistDto[]> {
        return this.httpClient.get<PlaylistDto[]>(`${environment.apiUrl}/playlists/user/${userId}`);
    }

    addVideoToPlaylist(playlistId: string, videoId: string): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/playlists/${playlistId}/videos/${videoId}`, null);
    }

    removeVideoFromPlaylist(playlistId: string, videoId: string): Observable<any> {
        return this.httpClient.delete<any>(`${environment.apiUrl}/playlists/${playlistId}/videos/${videoId}`);
    }

    deletePlaylist(playlistId: string): Observable<any> {
        return this.httpClient.delete<any>(`${environment.apiUrl}/playlists/${playlistId}`);
    }
}
