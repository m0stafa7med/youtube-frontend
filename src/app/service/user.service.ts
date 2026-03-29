import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {UserDto} from "../dto/user-dto";
import {VideoDto} from "../dto/video-dto";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userId: string = '';

    constructor(private httpClient: HttpClient) {
    }

    subscribeToUser(userId: string): Observable<boolean> {
        return this.httpClient.post<boolean>(`${environment.apiUrl}/user/subscribe/${userId}`, null);
    }

    isSubscribed(userId: string): Observable<boolean> {
        return this.httpClient.get<boolean>(`${environment.apiUrl}/user/subscribe/${userId}/status`);
    }

    unSubscribeUser(userId: string): Observable<boolean> {
        return this.httpClient.post<boolean>(`${environment.apiUrl}/user/unSubscribe/${userId}`, null);
    }

    registerUser(): Observable<string> {
        return this.httpClient.get(`${environment.apiUrl}/user/register`, {responseType: "text"})
            .pipe(tap(data => {
                this.userId = data;
            }));
    }

    getUserId(): string {
        return this.userId;
    }

    getUserProfile(userId: string): Observable<UserDto> {
        return this.httpClient.get<UserDto>(`${environment.apiUrl}/user/${userId}`);
    }

    getUserVideos(userId: string): Observable<Array<VideoDto>> {
        return this.httpClient.get<Array<VideoDto>>(`${environment.apiUrl}/user/${userId}/videos`);
    }
}
