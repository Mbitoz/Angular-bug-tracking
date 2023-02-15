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
    //Utilizzando JSON-server
    //return this.http.get<Array<Issues>>('https://localhost:3000/issues');

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('cache-control', 'no-cache');
    headers = headers.append('x-apikey', '63ec9e1a478852088da682c0');
    return this.http.get<Array<Issues>>('https://appbt-fe36.restdb.io/rest/issues', {
      headers: headers
    });
  }

  modifyIssue(issue: Issues): Observable<any> {
    //Utilizzando JSON-server
    //return this.http.put<Array<Issues>>(`https://localhost:3000/issues/${issue.id}`, issue);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('cache-control', 'no-cache');
    headers = headers.append('x-apikey', '63ec9e1a478852088da682c0');
    headers = headers.append('content-type', 'application/json');
    return this.http.put(`https://appbt-fe36.restdb.io/rest/issues/${issue._id}`, issue, {
      headers: headers
    });
  }

  createIssue(issue: Issues): Observable<any> {
    //Utilizzando JSON-server
    //return this.http.post<Array<Issues>>(`https://localhost:3000/issues`, issue);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('cache-control', 'no-cache');
    headers = headers.append('x-apikey', '63ec9e1a478852088da682c0');
    headers = headers.append('content-type', 'application/json');
    return this.http.post(`https://appbt-fe36.restdb.io/rest/issues`, issue, {
      headers: headers
    });
  }

  searchIssue(issue: Issues): Observable<any> {
    
    //Utilizzando JSON-server
    const params = {
      title_like: issue.title,
      openTo: issue.openTo,
      fkUserId: issue.fkUserId,
      priority: issue.priority,
      description_like: issue.description,
      state: issue.state
    };
    const queryParameter = omitBy(params, isNil);
    return this.http.get(`https://localhost:3000/issues`, {
      params: queryParameter
    });
    
  }

  getIssueById(id: number): Observable<any> {
    /*
    Utilizzando JSON-server
    const params = {
      id: id
    };
    const queryParameter = omitBy(params, isNil);
    const url = `https://localhost:3000/issues`;
    return this.http.get(url, {
      params: queryParameter
    });
    */

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('cache-control', 'no-cache');
    headers = headers.append('x-apikey', '63ec9e1a478852088da682c0');

    const q = {
      "_id": {id}
    }
    const url = `https://appbt-fe36.restdb.io/rest/issues?q={"numberIssue": ${id}}`;
    return this.http.get(url, {
      headers: headers
    });
  }


}
