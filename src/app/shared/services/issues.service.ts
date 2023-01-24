import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issues } from '../models/issues.model';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor(private http: HttpClient) { }

  getAllIssues(): Observable<Array<Issues>> {
    return this.http.get<Array<Issues>>('http://localhost:3000/issues');
  }

  modifyIssue(issue: Issues): Observable<any> {
    return this.http.put(`http://localhost:3000/issues/${issue.id}`, issue);
  }


}
