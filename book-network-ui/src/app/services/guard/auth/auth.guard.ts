import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {JwtTokenService} from "../../jwt-token/jwt-token.service";

export const authGuard: CanActivateFn = (route, state) => {
  const jwtTokenService = inject(JwtTokenService);
  const router = inject(Router);
  // If token not valid, redirect to login screen
  if (!jwtTokenService.isTokenValid()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
