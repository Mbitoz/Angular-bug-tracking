import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipologica } from '../models/issues.model';

@Injectable({
  providedIn: 'root'
})
export class TipologicheService {

  constructor(private http: HttpClient) { }

  getTipologiaOpenTo(): Observable<Array<Tipologica>> {
    //Utilizzando JSON-server
    //return this.http.get<Array<Tipologica>>('https://localhost:3000/tipologicaOpenTo');

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('cache-control', 'no-cache');
    headers = headers.append('x-apikey', '63ec9e1a478852088da682c0');
    return this.http.get<Array<Tipologica>>('https://appbt-fe36.restdb.io/rest/tipologica-open-to', {
      headers: headers
    });
  }

  getTipologiaPriority(): Observable<Array<Tipologica>> {
    //Utilizzando JSON-server
    //return this.http.get<Array<Tipologica>>('https://localhost:3000/tipologicaPriority');
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('cache-control', 'no-cache');
    headers = headers.append('x-apikey', '63ec9e1a478852088da682c0');
    return this.http.get<Array<Tipologica>>('https://appbt-fe36.restdb.io/rest/tipologica-priority', {
      headers: headers
    });
  }

}
