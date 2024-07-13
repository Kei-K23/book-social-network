import { Component } from '@angular/core';
import {AuthLoginRequest} from "../../services/models/auth-login-request";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {NgForOf, NgIf} from "@angular/common";
import {LocalStorageService} from "../../services/localStorage/local-storage.service";
import {KEYS} from "../../constants/keys";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  constructor(
    private router : Router,
    private authService : AuthenticationService,
    private localStorageService : LocalStorageService,
    private toastr : ToastrService
  ) {
  }

    login(email: string, password: string) {
    this.authService.login(
      {
        body: {
          email,
          password
        }
      }
    ).subscribe({
      next: res => {
        this.toastr.success("Login successful");

       // Save the JWT token in local storage
       this.localStorageService.setLocalStorage(KEYS.JWT_KEY, res.token as string);
       // Navigate to main screen
       this.router.navigate(['books']);
      },
      error: err => {
        console.log(err)
        if (err.error.validationErrors) {
          err.error.validationErrors.forEach((error : any) => this.toastr.error(error));
        } else {
          this.toastr.error(err.error.error);
        }
      }
    })
  }

  register() {
    this.router.navigate(['register']);
  }

}
