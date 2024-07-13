import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {LocalStorageService} from "../../../../services/localStorage/local-storage.service";
import {KEYS} from "../../../../constants/keys";
import {JwtTokenService} from "../../../../services/jwt-token/jwt-token.service";
import {UsersService} from "../../../../services/services/users.service";
import {UserResponse} from "../../../../services/models/user-response";
import {ToastrService} from "ngx-toastr";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  userResponse: UserResponse = {};

  constructor(
    private localStorageService : LocalStorageService,
    private usersService: UsersService,
    private router : Router,
    private toastr: ToastrService,
    private jwtTokenService : JwtTokenService
  ) {
  }

  ngOnInit() {
    this.getAuthUserData();
  }

  getAuthUserData() {
    this.usersService.getLoginUser().subscribe({
      next: value => {
        this.userResponse = value;
      },
      error: err => this.toastr.error(err.error.error)
    });
  }

  onLogout() {
    // Remove logined JWT token
    this.localStorageService.removeLocalStorage(KEYS.JWT_KEY)
    // Navigate to login screen
    this.router.navigate(['login'])
  }
}
