import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UploadVideoResponse} from "../upload-video/UploadVideoResponse";
import {VideoDto} from "../video-dto";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class VideoService {

    constructor(private httpClient: HttpClient) {
    }

    uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
        const formData = new FormData()
        formData.append('file', fileEntry, fileEntry.name);
        return this.httpClient.post<UploadVideoResponse>(`${environment.apiUrl}/videos`, formData);
    }

    uploadThumbnail(fileEntry: File, videoId: string): Observable<string> {
        const formData = new FormData()
        formData.append('file', fileEntry, fileEntry.name);
        formData.append('videoId', videoId);

        return this.httpClient.post(`${environment.apiUrl}/videos/thumbnail`, formData, {
            responseType: 'text'
        });
    }

    getVideo(videoId: string): Observable<VideoDto> {
        return this.httpClient.get<VideoDto>(`${environment.apiUrl}/videos/` + videoId);
    }

    saveVideo(videoMetaData: VideoDto): Observable<VideoDto> {
        return this.httpClient.put<VideoDto>(`${environment.apiUrl}/videos/`, videoMetaData);
    }

    getAllVideos(): Observable<Array<VideoDto>> {
        return this.httpClient.get<Array<VideoDto>>(`${environment.apiUrl}/videos/`);
    }

    likeVideo(videoId: string): Observable<VideoDto> {
        return this.httpClient.post<VideoDto>(`${environment.apiUrl}/videos/` + videoId + "/like", null);
    }

    disLikeVideo(videoId: string): Observable<VideoDto> {
        return this.httpClient.post<VideoDto>(`${environment.apiUrl}/videos/` + videoId + "/disLike", null);
    }
}
