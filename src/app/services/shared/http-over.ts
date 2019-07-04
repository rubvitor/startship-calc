import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HttpOver {

    constructor(private http: HttpClient) {
    }

    get(url, showLoading: boolean = true): Observable<any> {
        return this.http.get(url);
    }

    delete(url, showLoading: boolean = true): Observable<any> {
        return this.http.delete(url);
    }

    post(url: string, data?: any, options?: any, showLoading: boolean = true): Observable<any> {

        if (options == null) {
            options = {};
        }

        return this.http.post(url, data);
    }

    put(url: string, data: any, showLoading: boolean = true): Observable<any> {

        return this.http.put(url, data);
    }
}