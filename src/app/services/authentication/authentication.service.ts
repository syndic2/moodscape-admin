import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-query-compress';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl: string;

  constructor(private http: HttpClient) { 
    const tempUrl= environment.apiUrl.split('/');
    tempUrl[1]= '//';
    tempUrl[tempUrl.length-2]= '/api';
    tempUrl[tempUrl.length-1]= '/auth';

    this.apiUrl= tempUrl.join('');
  }

  login(emailOrUsername: string, password: string): Observable<any> {
    const query= gql(`
      mutation {
        adminLogin(emailOrUsername: "${emailOrUsername}", password: "${[password]}") {
          authenticatedUser {
            Id,
            firstName,
            lastName,
            email,
            username,
            password
          },
          accessToken,
          refreshToken,
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(`${this.apiUrl}`, { query: query }).pipe(
      map((res: any) => res.data.adminLogin)
    );
  }
}
