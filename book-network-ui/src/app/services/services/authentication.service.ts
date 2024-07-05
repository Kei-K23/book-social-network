/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { accountActivate } from '../fn/authentication/account-activate';
import { AccountActivate$Params } from '../fn/authentication/account-activate';
import { AuthResponse } from '../models/auth-response';
import { login } from '../fn/authentication/login';
import { Login$Params } from '../fn/authentication/login';
import { register } from '../fn/authentication/register';
import { Register$Params } from '../fn/authentication/register';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<{
}> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResponse>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: Login$Params, context?: HttpContext): Observable<AuthResponse> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthResponse>): AuthResponse => r.body)
    );
  }

  /** Path part for operation `accountActivate()` */
  static readonly AccountActivatePath = '/auth/account-activate/{token}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `accountActivate()` instead.
   *
   * This method doesn't expect any request body.
   */
  accountActivate$Response(params: AccountActivate$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return accountActivate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `accountActivate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  accountActivate(params: AccountActivate$Params, context?: HttpContext): Observable<{
}> {
    return this.accountActivate$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
