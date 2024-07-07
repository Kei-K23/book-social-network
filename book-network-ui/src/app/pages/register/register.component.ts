import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {AuthRegisterRequest} from "../../services/models/auth-register-request";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {ToastrService} from "ngx-toastr";

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

  constructor(
    private router : Router,
    private authService: AuthenticationService,
    private toastr : ToastrService
  ) {
  }

  login() {
    this.router.navigate(["login"]);
  }

  register() {
    // Check password and password confirm is equal,
    // then return and show error message
    if (this.authRegisterRequest.password !== this.authRegisterRequest.confirmPassword) {
      this.toastr.error("Password does not match!");
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
        this.toastr.success("Register successful");
        // Navigate to account activation page when register success
        this.router.navigate(['account-activate']);
      },
      error: err => {
        if (err.error.validationErrors) {
          err.error.validationErrors.forEach((error : any) => this.toastr.error(error));
        } else {
          this.toastr.error(err.error.error);
        }
      }
    })
  }
}
