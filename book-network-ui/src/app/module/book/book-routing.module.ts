import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {BookListComponent} from "./pages/book-list/book-list.component";
import {MyBooksComponent} from "./pages/my-books/my-books.component";
import {ReturnedComponent} from "./pages/returned/returned.component";
import {BorrowedComponent} from "./pages/borrowed/borrowed.component";
import {FavoriteComponent} from "./pages/favorite/favorite.component";
import {authGuard} from "../../services/guard/auth/auth.guard";
import {ManageBookComponent} from "./pages/manage-book/manage-book.component";
import {BookDetailComponent} from "./pages/book-detail/book-detail.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ManageProfileComponent} from "./pages/manage-profile/manage-profile.component";
import {OtherProfileComponent} from "./pages/other-profile/other-profile.component";

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
        path: "create",
        component: ManageBookComponent,
        canActivate: [authGuard],
      },
      {
        path: "edit/:id",
        component: ManageBookComponent,
        canActivate: [authGuard],
      },
      {
        path: "detail/:id",
        component: BookDetailComponent,
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
      {
        path: "profile/me",
        component: ProfileComponent,
        canActivate: [authGuard]
      },
      {
        path: "profile/:id",
        component: OtherProfileComponent,
        canActivate: [authGuard]
      },
      {
        path: "profile/me/edit",
        component: ManageProfileComponent,
        canActivate: [authGuard]
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
