/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseFavoriteResponse } from '../../models/page-response-favorite-response';

export interface GetAllFavoriteBooksByUser$Params {
  page?: number;
  size?: number;
}

export function getAllFavoriteBooksByUser(http: HttpClient, rootUrl: string, params?: GetAllFavoriteBooksByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFavoriteResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllFavoriteBooksByUser.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseFavoriteResponse>;
    })
  );
}

getAllFavoriteBooksByUser.PATH = '/favorites';
