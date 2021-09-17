import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import StringifyObject from 'stringify-object';
import gql from 'graphql-query-compress';

import { environment }from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) { }

  getArticles(title: string= ''): Observable<any> {
    const query= gql(`
      query {
        getArticles(title: "${title}") {
          Id,
          title,
          shortSummary,
          author,
          postedAt,
          reviewedBy,
          headerImg,
          content,
          urlName,
          url
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => res.data.getArticles)
    );
  }

  getArticle(id: string): Observable<any> {
    const query= gql(`
      query {
        getArticle(Id: "${id}") {
          Id,
          title,
          shortSummary,
          author,
          postedAt,
          reviewedBy,
          headerImg,
          content,
          urlName,
          url
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => res.data.getArticle)
    );
  }

  createArticle(fields: {}): Observable<any> {
    const args= StringifyObject(fields, { singleQuotes: false });
    const query= gql(`
      mutation {
        createArticle(fields: ${args}) {
          createdArticle {
            Id,
            title,
            shortSummary,
            author,
            postedAt,
            reviewedBy,
            headerImg,
            content,
            urlName,
            url
          },
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(`${environment.apiUrl}`, { query: query }).pipe(
      map((res: any) => res.data.createArticle)
    );
  }

  updateArticle(articleId, fields: {}): Observable<any> {
    const args= StringifyObject(fields, { singleQuotes: false });
    const query= gql(`
      mutation {
        updateArticle(Id: ${articleId}, fields: ${args}) {
          updatedArticle {
            Id,
            title,
            shortSummary,
            author,
            postedAt,
            reviewedBy,
            headerImg,
            content,
            urlName,
            url
          },
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(`${environment.apiUrl}`, { query: query }).pipe(
      map((res: any) => res.data.updateArticle)
    );
  }

  removeArticles(articleIds: number[]): Observable<any> {
    const query= gql(`
      mutation {
        removeArticles(articleIds: ${articleIds}) {
          removedArticles,
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(`${environment.apiUrl}`, { query: query }).pipe(
      map((res: any) => res.data.removeArticles)
    );
  }
}
