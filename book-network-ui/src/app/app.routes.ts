import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {AccountActivateComponent} from "./pages/account-activate/account-activate.component";
import {authGuard} from "./services/guard/auth/auth.guard";

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "account-activate",
    component: AccountActivateComponent
  },
  {
    path: "books",
    loadChildren: () => import("./module/book/book.module").then(m => m.BookModule),
    canActivate: [authGuard]
  }
];
