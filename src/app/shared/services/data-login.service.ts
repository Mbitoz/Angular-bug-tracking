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
    return this.http.get<Array<Users>>('http://localhost:3000/users');
  }

}
