import { TestBed } from '@angular/core/testing';

import { RequestHeadersInterceptor } from './request-headers.interceptor';

describe('RequestHeadersInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestHeadersInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestHeadersInterceptor = TestBed.inject(RequestHeadersInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
