/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserRequest } from '../../models/user-request';
import { UserResponse } from '../../models/user-response';

export interface UpdateLoginUser$Params {
      body: UserRequest
}

export function updateLoginUser(http: HttpClient, rootUrl: string, params: UpdateLoginUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
  const rb = new RequestBuilder(rootUrl, updateLoginUser.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserResponse>;
    })
  );
}

updateLoginUser.PATH = '/me';
