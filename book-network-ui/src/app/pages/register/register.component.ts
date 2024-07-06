import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {AuthRegisterRequest} from "../../services/models/auth-register-request";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authRegisterRequest: AuthRegisterRequest & {
    confirmPassword: string
  } = {email: "", firstName: "", lastName: "", password: "", confirmPassword: ""};
  errorMsg: Array<string> = [];

  constructor(
    private router : Router,
    private authService: AuthenticationService
  ) {
  }

  login() {
    this.router.navigate(["login"]);
  }

  register() {
    // Clear the previous error message
    this.errorMsg = [];
    // Check password and password confirm is equal,
    // then return and show error message
    if (this.authRegisterRequest.password !== this.authRegisterRequest.confirmPassword) {
      this.errorMsg = ["Password does not match!"];
      return;
    }

    this.authService.register({
      body: {
        firstName: this.authRegisterRequest.firstName,
        lastName: this.authRegisterRequest.lastName,
        email: this.authRegisterRequest.email,
        password: this.authRegisterRequest.password
      }
    }).subscribe({
      next: res => {
        // Navigate to account activation page when register success
        this.router.navigate(['account-activate']);
      },
      error: err => {
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error);
        }
      }
    })
  }
}
