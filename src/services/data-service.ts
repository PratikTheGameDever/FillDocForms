import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { text } from '../../node_modules/@angular/core/src/render3/instructions';

@Injectable()
export class DataService{
    constructor(private _http: HttpClient){}

    getData(): Observable<any> {
        return this._http.get('http://localhost:3000/api/data', {responseType: 'text'});
    }
}