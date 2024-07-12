/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { delete$ } from '../fn/favorites/delete';
import { Delete$Params } from '../fn/favorites/delete';
import { getAllFavoriteBooksByUser } from '../fn/favorites/get-all-favorite-books-by-user';
import { GetAllFavoriteBooksByUser$Params } from '../fn/favorites/get-all-favorite-books-by-user';
import { PageResponseFavoriteResponse } from '../models/page-response-favorite-response';
import { save1 } from '../fn/favorites/save-1';
import { Save1$Params } from '../fn/favorites/save-1';

@Injectable({ providedIn: 'root' })
export class FavoritesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `save1()` */
  static readonly Save1Path = '/favorites/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save1()` instead.
   *
   * This method doesn't expect any request body.
   */
  save1$Response(params: Save1$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return save1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  save1(params: Save1$Params, context?: HttpContext): Observable<number> {
    return this.save1$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getAllFavoriteBooksByUser()` */
  static readonly GetAllFavoriteBooksByUserPath = '/favorites';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllFavoriteBooksByUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFavoriteBooksByUser$Response(params?: GetAllFavoriteBooksByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFavoriteResponse>> {
    return getAllFavoriteBooksByUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllFavoriteBooksByUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFavoriteBooksByUser(params?: GetAllFavoriteBooksByUser$Params, context?: HttpContext): Observable<PageResponseFavoriteResponse> {
    return this.getAllFavoriteBooksByUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseFavoriteResponse>): PageResponseFavoriteResponse => r.body)
    );
  }

  /** Path part for operation `delete()` */
  static readonly DeletePath = '/favorites/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete$Response(params: Delete$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return delete$(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete(params: Delete$Params, context?: HttpContext): Observable<{
}> {
    return this.delete$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
