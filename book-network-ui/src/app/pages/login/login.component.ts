import { Component } from '@angular/core';
import {AuthLoginRequest} from "../../services/models/auth-login-request";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authRequest : AuthLoginRequest = {email: "", password: ""};
  errorMsg: Array<string> = [];


}
