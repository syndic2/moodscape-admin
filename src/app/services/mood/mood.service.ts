import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gqlCompress from 'graphql-query-compress';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoodService {

  constructor(private httpClient: HttpClient) { }

  getTotalMoodGroupByType(): Observable<any> {
    const query = gqlCompress(`
      query {
        getTotalMoodGroupByType {
          veryHappy,
          happy,
          netral,
          sad,
          verySad
        }
      }
    `);

    return this.httpClient.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => res.data.getTotalMoodGroupByType)
    );
  }

  getMoodsGrowthByYear(startDate: string, endDate: string): Observable<any> {
    const query = gqlCompress(`
      query {
        getMoodsGrowthByYear(startDate: "${startDate}", endDate: "${endDate}") {
          monthName,
          monthNumber,
          year,
          moodCount,
          moodAverage
        }
      }
    `);

    return this.httpClient.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => res.data.getMoodsGrowthByYear)
    );
  }
}
