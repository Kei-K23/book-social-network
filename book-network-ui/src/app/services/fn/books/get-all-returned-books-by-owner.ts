/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseBookTransactionResponse } from '../../models/page-response-book-transaction-response';

export interface GetAllReturnedBooksByOwner$Params {
  page?: number;
  size?: number;
}

export function getAllReturnedBooksByOwner(http: HttpClient, rootUrl: string, params?: GetAllReturnedBooksByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBookTransactionResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllReturnedBooksByOwner.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseBookTransactionResponse>;
    })
  );
}

getAllReturnedBooksByOwner.PATH = '/books/returned';
