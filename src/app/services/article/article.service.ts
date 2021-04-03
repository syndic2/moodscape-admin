import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Article } from 'src/app/models/article';
import { environment }from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private httpHeaders: HttpHeaders;
  private httpOptions: any= {
    responseType: 'json'
  };

  constructor(private http: HttpClient) { }

  defaultHeaders() {
    return new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
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

    return this.http.get(`${environment.api_url}?query=${query}`, this.httpOptions).pipe(
      map((res: any) => <Article[]>res.data.allArticle)
    );
  }
}
