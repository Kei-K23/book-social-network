import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {LocalStorageService} from "../../../../services/localStorage/local-storage.service";
import {KEYS} from "../../../../constants/keys";
import {JwtTokenService} from "../../../../services/jwt-token/jwt-token.service";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  username: string = "";

  constructor(
    private localStorageService : LocalStorageService,
    private router : Router,
    private jwtTokenService : JwtTokenService
  ) {
  }

  ngOnInit() {
    this.username = this.jwtTokenService.getValueFromJwt("fullName") || "";
  }

  onLogout() {
    // Remove logined JWT token
    this.localStorageService.removeLocalStorage(KEYS.JWT_KEY)
    // Navigate to login screen
    this.router.navigate(['login'])
  }
}
