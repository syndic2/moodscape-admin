import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import StringifyObject from 'stringify-object';
import gql from 'graphql-query-compress';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PsychologyDiseaseService {

  constructor(private http: HttpClient) { }

  getDiseases(): Observable<any> {
    const query= gql(`

    `);

    return this.http.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => console.log('res', res))
    );
  }

  getDisease(diseaseId: number): Observable<any> {
    const query= gql(`

    `);

    return this.http.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => console.log('res', res))
    );
  }

  createDisease(fields: {}): Observable<any> {
    const query= gql(`

    `);

    return this.http.post(`${environment.apiUrl}`, { query: query }).pipe(
      map((res: any) => console.log('res', res))
    );
  }

  updateDisease(diseaseId: number, fields: {}): Observable<any> {
    const query= gql(`

    `);

    return this.http.post(`${environment.apiUrl}`, { query: query }).pipe(
      map((res: any) => console.log('res', res))
    );
  }

  removeDiseases(diseaseIds: number[]): Observable<any> {
    const query= gql(`

    `);

    return this.http.post(`${environment.apiUrl}`, { query: query }).pipe(
      map((res: any) => console.log('res', res))
    );
  }
}
