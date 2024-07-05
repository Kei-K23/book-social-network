import { Component } from '@angular/core';
import {AuthLoginRequest} from "../../services/models/auth-login-request";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {NgForOf, NgIf} from "@angular/common";
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authRequest : AuthLoginRequest = {email: "", password: ""};
  errorMsg: Array<string> = [];

  constructor(
    private router : Router,
    private authService : AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  login() {
    // Make sure to clear the errorMsg array
    this.errorMsg = [];
    this.authService.login(
      {
        body: this.authRequest
      }
    ).subscribe({
      next: res => {
       // Save the JWT token in local storage
        this.tokenService.token = res.token as string;
       // Navigate to main screen
       this.router.navigate(['books']);
      },
      error: err => {
        console.log(err)
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error);
        }
      }
    })
  }

  register() {
    this.router.navigate(['register']);
  }

}
