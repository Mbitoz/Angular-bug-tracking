import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issues } from '../models/issues.model';
import { isNil, omitBy } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor(private http: HttpClient) { }

  getAllIssues(): Observable<Array<Issues>> {
    return this.http.get<Array<Issues>>('http://localhost:3000/issues');
  }

  modifyIssue(issue: Issues): Observable<any> {
    return this.http.put<Array<Issues>>(`http://localhost:3000/issues/${issue.id}`, issue);
  }

  createIssue(issue: Issues): Observable<any> {
    return this.http.post<Array<Issues>>(`http://localhost:3000/issues`, issue);
  }

  searchIssue(issue: Issues): Observable<any> {
    const params = {
      title_like: issue.title,
      openTo: issue.openTo,
      fkUserId: issue.fkUserId,
      priority: issue.priority,
      description_like: issue.description,
      state: issue.state
    };
    const queryParameter = omitBy(params, isNil);
    return this.http.get(`http://localhost:3000/issues`, {
      params: queryParameter
    });
    
  }

  getIssueById(id: number): Observable<any> {
    const params = {
      id: id
    };
    const queryParameter = omitBy(params, isNil);
    const url = `http://localhost:3000/issues`;
    return this.http.get(url, {
      params: queryParameter
    });
  }


}
