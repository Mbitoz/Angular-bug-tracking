import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipologica } from '../models/issues.model';

@Injectable({
  providedIn: 'root'
})
export class TipologicheService {

  constructor(private http: HttpClient) { }

  getTipologiaOpenTo(): Observable<Array<Tipologica>> {
    return this.http.get<Array<Tipologica>>('https://json-server-bt.vercel.app/tipologicaOpenTo');
  }

  getTipologiaPriority(): Observable<Array<Tipologica>> {
    return this.http.get<Array<Tipologica>>('https://json-server-bt.vercel.app/tipologicaPriority');
  }

}
