import { Injectable, Component, Inject } from '@angular/core';
import { HttpOver } from './shared/http-over';
import { Starship } from '../models/Startship';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StarshipService {

    constructor(public http: HttpOver, @Inject('BASE_URL') public baseUrl: string) {
    }

    GetAll(): Observable<any>  {
        return this.http.get(this.baseUrl + 'starships');
    }
}