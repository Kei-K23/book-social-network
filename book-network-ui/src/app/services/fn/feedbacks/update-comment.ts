/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FeedBackCommentUpdateRequest } from '../../models/feed-back-comment-update-request';

export interface UpdateComment$Params {
  'feedback-id': number;
      body: FeedBackCommentUpdateRequest
}

export function updateComment(http: HttpClient, rootUrl: string, params: UpdateComment$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, updateComment.PATH, 'patch');
  if (params) {
    rb.path('feedback-id', params['feedback-id'], {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

updateComment.PATH = '/feedbacks/{feedback-id}';
