import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {LocalStorageService} from "../localStorage/local-storage.service";
import {KEYS} from "../../constants/keys";

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor(
    private localStorageService : LocalStorageService
  ) {
  }

  isTokenValid() {
    const token = this.localStorageService.getLocalStorage(KEYS.JWT_KEY);
    if (!token) {
      return false;
    }
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      // Clear the jwt token from storage
      localStorage.removeItem(KEYS.JWT_KEY);
      return false;
    }
    // Return true if token valid
    return true;
  }

  setUsernameToLocalStorage(token : string) {
    if (!token) {
      return;
    }
    const jwtHelper = new JwtHelperService();
    const decoded = jwtHelper.decodeToken(token);
    console.log(decoded);
  }
}
