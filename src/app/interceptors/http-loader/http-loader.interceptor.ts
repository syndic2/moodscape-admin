import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {

  constructor(private utilitiesService: UtilitiesService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.utilitiesService.isLoading.next(true);

    return next.handle(request).pipe(
      finalize(() => this.utilitiesService.isLoading.next(false))
    );
  }
}
