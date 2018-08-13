import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService{
    constructor(private _http: HttpClient){}

    get(url: string): Observable<any> {
        return this._http.get(url , {responseType: 'text'});
    }

    post(data: string): Observable<any> {
        return this._http.post('http://localhost:3000/api/data', {body : data});
    }

    postFinal(data: string, pdfData: string): Observable<any> {
        return this._http.post('http://localhost:3000/api/data/final', {body: data, pdfData: pdfData});
    }

    getFinal(): Observable<any> {
        return this._http.get('http://localhost:3000/api/data/final');
    }
}