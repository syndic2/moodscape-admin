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
export class ArticleService {
  constructor(private http: HttpClient) { }

  getArticles(title: string = ''): Observable<any> {
    const query = gql(`
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
    const query = gql(`
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

  createArticle(fields: {}, headerImgUpload: File): Observable<any> {
    const args = StringifyObject(fields, { singleQuotes: false });
    const operations = {
      query: gql(`
        mutation($file: Upload) {
          createArticle(fields: ${args}, headerImgUpload: $file) {
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
      `),
      variables: {
        file: null
      }
    };
    const _map = {
      file: ['variables.file']
    };

    const formData = new FormData();
    formData.append('operations', JSON.stringify(operations));
    formData.append('map', JSON.stringify(_map));
    formData.append('file', headerImgUpload ? headerImgUpload : new File([], 'default'));

    return this.http.post(`${environment.apiUrl}`, formData, {
      headers: {
        skipRequestHeadersInterceptor: 'true',
        'Accept': 'application/json'
      }
    }).pipe(
      map((res: any) => res.data.createArticle)
    );
  }

  updateArticle(articleId, fields: {}, headerImgUpload: File): Observable<any> {
    const args = StringifyObject(fields, { singleQuotes: false });
    const operations = {
      query: gql(`
        mutation($file: Upload) {
          updateArticle(Id: ${articleId}, fields: ${args}, headerImgUpload: $file) {
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
      `),
      variables: {
        file: null
      }
    };
    const _map = {
      file: ['variables.file']
    };

    const formData = new FormData();
    formData.append('operations', JSON.stringify(operations))
    formData.append('map', JSON.stringify(_map));
    formData.append('file', headerImgUpload ? headerImgUpload : new File([], 'default'));

    return this.http.post(`${environment.apiUrl}`, formData, {
      headers: {
        skipRequestHeadersInterceptor: 'true',
        'Accept': 'application/json'
      }
    }).pipe(
      map((res: any) => res.data.updateArticle)
    );
  }

  removeArticles(articleIds: number[], isSoftDelete: boolean): Observable<any> {
    const query = gql(`
      mutation {
        removeArticles(articleIds: ${articleIds}, isSoftDelete: ${isSoftDelete}) {
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
