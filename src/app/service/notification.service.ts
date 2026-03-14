import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NotificationDto} from "../dto/notification-dto";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private httpClient: HttpClient) {
    }

    getNotifications(): Observable<NotificationDto[]> {
        return this.httpClient.get<NotificationDto[]>(`${environment.apiUrl}/notifications`);
    }

    getUnreadCount(): Observable<number> {
        return this.httpClient.get<number>(`${environment.apiUrl}/notifications/unread-count`);
    }

    markAsRead(id: string): Observable<any> {
        return this.httpClient.put<any>(`${environment.apiUrl}/notifications/${id}/read`, null);
    }

    markAllAsRead(): Observable<any> {
        return this.httpClient.put<any>(`${environment.apiUrl}/notifications/read-all`, null);
    }
}
