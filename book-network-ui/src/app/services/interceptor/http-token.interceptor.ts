import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {KEYS} from "../../constants/keys";
import {inject} from "@angular/core";
import {LocalStorageService} from "../localStorage/local-storage.service";

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.getLocalStorage(KEYS.JWT_KEY);

  if (token) {
    // Set the jwt token from localStorage to http request
    const authRequest = req.clone(
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }
    );

    return next(authRequest);
  }
  // If not have JWT token, just return request
  return next(req);
};
