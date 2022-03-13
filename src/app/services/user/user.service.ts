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
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    const query = gql(`
      query {
        getUsers {
          Id,
          firstName,
          lastName,
          gender,
          dateOfBirth,
          email,
          username,
          password,
          imgUrl,
          joinedAt,
          isActive
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => res.data.getUsers)
    );
  }

  getUsersGroupByGender(): Observable<any> {
    const query = gql(`
      query {
        getUsersGroupByGender {
          males {
            Id
          },
          females {
            Id
          }
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => res.data.getUsersGroupByGender)
    );
  }

  getUsersGroupByAge(): Observable<any> {
    const query = gql(`
      query {
        getUsersGroupByAge {
          children {
            group,
            range,
            users {
              Id
            }
          },
          teenager {
            group,
            range,
            users {
              Id
            }
          },
          adult {
            group,
            range,
            users {
              Id
            }
          },
          elderly {
            group,
            range,
            users {
              Id
            }
          },
          aboveElderly {
            group,
            range,
            users {
              Id
            }
          }
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => res.data.getUsersGroupByAge)
    );
  }

  getUsersGrowthByYear(startDate: string, endDate: string): Observable<any> {
    const query = gql(`
      query {
        getUsersGrowthByYear(startDate: "${startDate}", endDate: "${endDate}") {
          monthName,
          monthNumber,
          users {
            Id
          }
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => res.data.getUsersGrowthByYear)
    );
  }

  getUser(userId: string): Observable<any> {
    const query = gql(`
      query {
        getUser(Id: "${userId}") {
          Id,
          firstName,
          lastName,
          gender,
          age,
          email,
          username,
          password,
          imgUrl,
          joinedAt,
          isActive
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}?query=${query}`).pipe(
      map((res: any) => res.data.getUser)
    );
  }

  updateUser(userId: string, fields: {}, imgUpload: File): Observable<any> {
    const args = StringifyObject(fields, { singleQuotes: false });
    const operations = {
      query: gql(`
        mutation($file: Upload) {
          updateUser(Id: \"${userId}\", fields: ${args}, imgUpload: $file) {
            updatedUser {
              Id,
              firstName,
              lastName,
              gender,
              dateOfBirth,
              email,
              username,
              password,
              imgUrl,
              joinedAt,
              isActive
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
    formData.append('file', imgUpload ? imgUpload : new File([], 'default'))

    return this.http.post(environment.apiUrl, formData, {
      headers: {
        skipRequestHeadersInterceptor: 'true',
        'Accept': 'application/json'
      }
    }).pipe(
      map((res: any) => res.data.updateUser)
    )
  }

  removeUsers(userIds: string[], isSoftDelete: boolean = true): Observable<any> {
    const query = gql(`
      mutation {
        removeUsers(userIds: ${userIds.map(Id => `"${Id}"`)}, isSoftDelete: ${isSoftDelete}) {
          removedUsers,
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(environment.apiUrl, { query: query }).pipe(
      map((res: any) => res.data.removeUsers)
    );
  }
}
