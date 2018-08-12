import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { text } from '../../node_modules/@angular/core/src/render3/instructions';

@Injectable()
export class DataService{
    constructor(private _http: HttpClient){}

    get(url: string): Observable<any> {
        return this._http.get(url , {responseType: 'text'});
    }

    post(data: string): Observable<any> {
        return this._http.post('http://localhost:3000/api/data', {body : data});
    }
}