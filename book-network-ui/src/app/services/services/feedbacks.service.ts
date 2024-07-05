/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllFeedbacksByBookId } from '../fn/feedbacks/get-all-feedbacks-by-book-id';
import { GetAllFeedbacksByBookId$Params } from '../fn/feedbacks/get-all-feedbacks-by-book-id';
import { PageResponseFeedbackResponse } from '../models/page-response-feedback-response';
import { save } from '../fn/feedbacks/save';
import { Save$Params } from '../fn/feedbacks/save';
import { updateComment } from '../fn/feedbacks/update-comment';
import { UpdateComment$Params } from '../fn/feedbacks/update-comment';

@Injectable({ providedIn: 'root' })
export class FeedbacksService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `save()` */
  static readonly SavePath = '/feedbacks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save$Response(params: Save$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return save(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save(params: Save$Params, context?: HttpContext): Observable<number> {
    return this.save$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateComment()` */
  static readonly UpdateCommentPath = '/feedbacks/{feedback-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateComment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComment$Response(params: UpdateComment$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateComment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateComment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComment(params: UpdateComment$Params, context?: HttpContext): Observable<number> {
    return this.updateComment$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getAllFeedbacksByBookId()` */
  static readonly GetAllFeedbacksByBookIdPath = '/feedbacks/book/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllFeedbacksByBookId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFeedbacksByBookId$Response(params: GetAllFeedbacksByBookId$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFeedbackResponse>> {
    return getAllFeedbacksByBookId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllFeedbacksByBookId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFeedbacksByBookId(params: GetAllFeedbacksByBookId$Params, context?: HttpContext): Observable<PageResponseFeedbackResponse> {
    return this.getAllFeedbacksByBookId$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseFeedbackResponse>): PageResponseFeedbackResponse => r.body)
    );
  }

}
