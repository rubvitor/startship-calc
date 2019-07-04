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

        const headers = new HttpHeaders();

        return this.http.get(url, {
            headers: headers
        });
    }

    delete(url, showLoading: boolean = true): Observable<any> {


        const headers = new HttpHeaders();

        return this.http.delete(url, {
            headers: headers
        });
    }

    post(url: string, data?: any, options?: any, showLoading: boolean = true): Observable<any> {


        const headers = new HttpHeaders();
        if (options == null) {
            options = {};
        }

        options.headers = headers;

        return this.http.post(url, data, options);
    }

    put(url: string, data: any, showLoading: boolean = true): Observable<any> {

        const headers = new HttpHeaders();

        return this.http.put(url, data, {
            headers: headers
        });
    }
}