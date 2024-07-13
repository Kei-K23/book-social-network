/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseBookResponse } from '../../models/page-response-book-response';

export interface GetAllBooksByOwnerId$Params {
  ownerId: number;
  page?: number;
  size?: number;
}

export function getAllBooksByOwnerId(http: HttpClient, rootUrl: string, params: GetAllBooksByOwnerId$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBookResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllBooksByOwnerId.PATH, 'get');
  if (params) {
    rb.query('ownerId', params.ownerId, {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseBookResponse>;
    })
  );
}

getAllBooksByOwnerId.PATH = '/books/owner/{owner-id}';
