import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentDto} from "../dto/comment-dto";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    constructor(private httpClient: HttpClient) {
    }

    postComment(commentDto: any, videoId: string): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/videos/${videoId}/comment`, commentDto);
    }

    getAllComments(videoId: string): Observable<Array<CommentDto>> {
        return this.httpClient.get<CommentDto[]>(`${environment.apiUrl}/videos/${videoId}/comment`);
    }

    editComment(videoId: string, commentId: string, commentDto: any): Observable<any> {
        return this.httpClient.put<any>(`${environment.apiUrl}/videos/${videoId}/comment/${commentId}`, commentDto);
    }

    deleteComment(videoId: string, commentId: string): Observable<any> {
        return this.httpClient.delete<any>(`${environment.apiUrl}/videos/${videoId}/comment/${commentId}`);
    }

    addReply(videoId: string, commentId: string, commentDto: any): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/videos/${videoId}/comment/${commentId}/reply`, commentDto);
    }
}
