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
   * App feedback
  */
  getAppFeedbacks(): Observable<any> {
    const query = gql(`
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
          handleStatus,
          handleNote
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
    const query = gql(`
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
    const query = gql(`
      query {
        getAppFeedbacksGrowthByYear(startDate: "${startDate}", endDate: "${endDate}") {
          monthName,
          monthNumber,
          year,
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
    const query = gql(`
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

  handleAppFeedback(feedbackId: string, handleStatus: string, handleNote: string = ''): Observable<any> {
    const query = gql(`
      mutation {
        handleAppFeedback(
          feedbackId: "${feedbackId}",
          handleStatus: "${handleStatus}",
          handleNote: "${handleNote}",
        ) {
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(`${environment.apiUrl}`, { query: query }).pipe(
      map((res: any) => res.data.handleAppFeedback)
    );
  }

  removeAppFeedbacks(feedbackIds: string[]): Observable<any> {
    const query = gql(`
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

  /**
   * Chatbot feedback
  */
  getChatbotFeedbacks(): Observable<any> {
    const query = gql(`
      query {
        getChatbotFeedbacks {
          Id,
          review,
          botMessage {
            Id,
            sender,
            recipientId,
            text
          },
          messages {
            Id,
            sender,
            recipientId,
            text
          },
          user {
            Id,
            username,
            firstName
          },
          handleStatus,
          handleNote,
          createdAt {
            date,
            time
          }
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => res.data.getChatbotFeedbacks)
    );
  }

  handleChatbotFeedback(feedbackId: string, handleStatus: string, handleNote: string = ''): Observable<any> {
    const query = gql(`
      mutation {
        handleChatbotFeedback(
          feedbackId: "${feedbackId}",
          handleStatus: "${handleStatus}",
          handleNote: "${handleNote}",
        ) {
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(`${environment.apiUrl}`, { query: query }).pipe(
      map((res: any) => res.data.handleChatbotFeedback)
    );
  }

  removeChatbotFeedbacks(feedbackIds: string[]): Observable<any> {
    const query = gql(`
      mutation {
        removeChatbotFeedbacks(feedbackIds: ${feedbackIds.map(Id => `"${Id}"`)}) {
          removedFeedbacks,
          response {
            status,
            text
          }
        }
      }
    `);

    return this.http.post(`${environment.apiUrl}`, { query: query }).pipe(
      map((res: any) => res.data.removeChatbotFeedbacks)
    );
  }
}
