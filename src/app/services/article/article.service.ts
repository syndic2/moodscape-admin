import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import StringifyObject from 'stringify-object';

import { environment }from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private httpOptions: any= {
    responseType: 'json'
  };

  constructor(private http: HttpClient) { }

  private defaultHeaders() {
    return new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  }

  getOne(id: string): Observable<any> {
    const query= `
      query {
        article(Id: "${id}") {
          title,
          shortSummary,
          author,
          postedAt,
          reviewedBy,
          content,
        }
      }
    `;

    this.httpOptions.headers= null;

    return this.http.get(`${environment.api_url}?query=${query}`, this.httpOptions).pipe(
      map((res: any) => res.data.article)
    );
  }

  getAll(): Observable<any> {
    const query= `
      query {
        allArticle(fields: {}) {
          Id,
          title,
          shortSummary,
          author,
          postedAt,
          reviewedBy,
          headerImg,
          content,
          url
        }
      }
    `;

    this.httpOptions.headers= null;

    return this.http.get(`${environment.api_url}?query=${query}`, this.httpOptions).pipe(
      map((res: any) => res.data.allArticle)
    );
  }

  update(id, data): Observable<any> {
    const args= StringifyObject(data, { singleQuotes: false });
    const query= `
      mutation {
        updateArticle(Id: "${id}", fields: ${args}) {
          updated,
          response {
            text,
            status
          }
        }
      }
    `;

    this.httpOptions.headers= this.defaultHeaders();

    return this.http.post(`${environment.api_url}`, { query: query }, this.httpOptions).pipe(
      map((res: any) => res.data.updateArticle)
    );
  }
}
