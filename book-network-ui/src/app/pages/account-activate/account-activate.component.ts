import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CodeInputModule} from "angular-code-input";

@Component({
  selector: 'app-account-activate',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    CodeInputModule
  ],
  templateUrl: './account-activate.component.html',
  styleUrl: './account-activate.component.css'
})
export class AccountActivateComponent {
  message: string = '';
  isOk: boolean = true;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  onCodeCompleted (token: string) {
    this.confirmToken(token);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  private confirmToken(token: string) {
    this.authService.accountActivate({
      token
    },).subscribe(
      {
        next : () => {
          // When account activation is successful
          this.isOk = true;
          this.submitted = true;
          this.message = "Your account have been successfully activated.";
        },
        error: err => {
          // When account activation is not successful
          this.isOk = false;
          this.submitted = true;
          this.message = "Invalid validation code. Please try again.";
        }
      }
    )
  }
}
