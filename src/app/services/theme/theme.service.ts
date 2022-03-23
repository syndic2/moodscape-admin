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
export class ThemeService {

  constructor(private htpp: HttpClient) { }

  getThemes(): Observable<any> {
    const query = gql(`
      query {
        getThemes {
          Id,
          name,
          colors {
            primary,
            primaryRgb,
            primaryContrast,
            primaryContrastRgb,
            primaryShade,
            primaryTint
          },
          isActive
        }
      }
    `);

    return this.htpp.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => res.data.getThemes)
    );
  }

  createTheme(fields: {}): Observable<any> {
    const args = StringifyObject(fields, { singleQuotes: false });
    const query = gql(`
      mutation {
        createTheme(fields: ${args}) {
          createdTheme {
            Id
            name,
            colors {
              primary,
              primaryRgb,
              primaryContrast,
              primaryContrastRgb,
              primaryShade,
              primaryTint
            },
            isActive
          },
          response {
            text,
            status
          }
        }
      }
    `);

    return this.htpp.post(`${environment.apiUrl}`, { query: query }).pipe(
      map((res: any) => res.data.createTheme)
    );
  }

  updateTheme(themeId: string, fields: {}): Observable<any> {
    const args = StringifyObject(fields, { singleQuotes: false });
    const query = gql(`
      mutation {
        updateTheme(Id: "${themeId}", fields: ${args}) {
          updatedTheme {
          Id,
            name,
            colors {
              primary,
              primaryRgb,
              primaryContrast,
              primaryContrastRgb,
              primaryShade,
              primaryTint
            },
            isActive
          },
          response {
            text,
            status
          }
        }
      }
    `);

    return this.htpp.post(`${environment.apiUrl}`, { query: query }).pipe(
      map((res: any) => res.data.updateTheme)
    );
  }

  removeThemes(themeIds: string[], isSoftDelete: boolean = true): Observable<any> {
    const query = gql(`
      mutation {
        removeThemes(themeIds: ${themeIds.map(Id => `"${Id}"`)}, isSoftDelete: ${isSoftDelete}) {
          removedThemes,
          response {
            text,
            status
          }
        }
      }
    `);

    return this.htpp.post(`${environment.apiUrl}`, { query: query }).pipe(
      map((res: any) => res.data.removeThemes)
    );
  }
}
