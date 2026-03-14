import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReportDto} from "../dto/report-dto";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(private httpClient: HttpClient) {
    }

    submitReport(report: ReportDto): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiUrl}/reports`, report);
    }
}
