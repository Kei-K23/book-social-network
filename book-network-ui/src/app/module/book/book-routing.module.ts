import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {BookListComponent} from "./pages/book-list/book-list.component";
import {MyBooksComponent} from "./pages/my-books/my-books.component";
import {ReturnedComponent} from "./pages/returned/returned.component";
import {BorrowedComponent} from "./pages/borrowed/borrowed.component";
import {FavoriteComponent} from "./pages/favorite/favorite.component";
import {authGuard} from "../../services/guard/auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "",
        component: BookListComponent,
        canActivate: [authGuard]
      },
      {
        path: "my-books",
        component: MyBooksComponent,
        canActivate: [authGuard],
      },
      {
        path: "favorite",
        component: FavoriteComponent,
        canActivate: [authGuard],
      },
      {
        path: "returned",
        component: ReturnedComponent,
        canActivate: [authGuard],
      },
      {
        path: "borrowed",
        component: BorrowedComponent,
        canActivate: [authGuard],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
