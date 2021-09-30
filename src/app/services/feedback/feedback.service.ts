import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-query-compress';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }
  /** 
   * Chatbot feedback
  */

  /** 
   * App feedback
  */
  getAppFeedbacks(): Observable<any> {
    const query= gql(`
      query {
        getAppFeedbacks {
          Id,
          user {
            Id,
            firstName,
            lastName,
            email,
            username,
            gender
          },
          rating,
          review,
          featureCategory,
          createdAt {
            date,
            time
          }
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => res.data.getAppFeedbacks)
    );
  }

  getAppFeedbacksGroupByRating() {
    const query= gql(`
      query {
        getAppFeedbacksGroupByRating {
          veryUseful {
            group,
            users {
              Id,
              gender
            },
            userAverageAge
          },
          useful {
            group,
            users {
              Id,
              gender
            },
            userAverageAge
          },
          neutral {
            group,
            users {
              Id,
              gender
            },
            userAverageAge
          },
          useless {
            group, 
            users {
              Id,
              gender
            },
            userAverageAge
          },
          veryUseless {
            group,
            users {
              Id,
              gender
            },
            userAverageAge
          }
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => res.data.getAppFeedbacksGroupByRating)
    );
  }

  getAppFeedbacksGrowthByYear(startDate: string, endDate: string): Observable<any> {
    const query= gql(`
      query {
        getAppFeedbacksGrowthByYear(startDate: "${startDate}", endDate: "${endDate}") {
          month,
          feedbacks {
            Id,
            rating
          },
          averageRating
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => res.data.getAppFeedbacksGrowthByYear)
    );
  }

  getAppFeedback(feedbackId: string): Observable<any> {
    const query= gql(`
    query {
        getAppFeedback(Id: "${feedbackId}") {
          Id,
          rating,
          review,
          featureCategory,
          createdAt {
            date,
            time
          },
          user {
            Id,
            username
          }
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => res.data.getAppFeedback)
    );
  }

  removeAppFeedbacks(feedbackIds: string[]): Observable<any> {
    const query=  gql(`
      mutation {
        removeAppFeedbacks(feedbackIds: ${feedbackIds.map(Id => `"${Id}"`)}) {
          removedFeedbacks,
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(environment.apiUrl, { query: query }).pipe(
      map((res: any) => res.data.removeAppFeedbacks)
    );
  }
}
