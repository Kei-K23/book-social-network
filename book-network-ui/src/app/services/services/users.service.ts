/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteLoginUser } from '../fn/users/delete-login-user';
import { DeleteLoginUser$Params } from '../fn/users/delete-login-user';
import { getLoginUser } from '../fn/users/get-login-user';
import { GetLoginUser$Params } from '../fn/users/get-login-user';
import { updateLoginUser } from '../fn/users/update-login-user';
import { UpdateLoginUser$Params } from '../fn/users/update-login-user';
import { uploadProfilePicture } from '../fn/users/upload-profile-picture';
import { UploadProfilePicture$Params } from '../fn/users/upload-profile-picture';
import { UserResponse } from '../models/user-response';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getLoginUser()` */
  static readonly GetLoginUserPath = '/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLoginUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLoginUser$Response(params?: GetLoginUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return getLoginUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLoginUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLoginUser(params?: GetLoginUser$Params, context?: HttpContext): Observable<UserResponse> {
    return this.getLoginUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `updateLoginUser()` */
  static readonly UpdateLoginUserPath = '/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateLoginUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLoginUser$Response(params: UpdateLoginUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return updateLoginUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateLoginUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLoginUser(params: UpdateLoginUser$Params, context?: HttpContext): Observable<UserResponse> {
    return this.updateLoginUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `deleteLoginUser()` */
  static readonly DeleteLoginUserPath = '/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLoginUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLoginUser$Response(params?: DeleteLoginUser$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteLoginUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteLoginUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLoginUser(params?: DeleteLoginUser$Params, context?: HttpContext): Observable<void> {
    return this.deleteLoginUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `uploadProfilePicture()` */
  static readonly UploadProfilePicturePath = '/me/profile-upload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadProfilePicture()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProfilePicture$Response(params?: UploadProfilePicture$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadProfilePicture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadProfilePicture$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProfilePicture(params?: UploadProfilePicture$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadProfilePicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
