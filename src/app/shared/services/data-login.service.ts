import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/data-login.model';

@Injectable({
  providedIn: 'root'
})
export class DataLoginService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Array<Users>> {
    //Utilizzando JSON-server
    //return this.http.get<Array<Users>>('https://localhost:3000/users');
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('cache-control', 'no-cache');
    headers = headers.append('x-apikey', '63ec9e1a478852088da682c0');
    return this.http.get<Array<Users>>('https://appbt-fe36.restdb.io/rest/utenti', {
      headers: headers
    });
  }

}
