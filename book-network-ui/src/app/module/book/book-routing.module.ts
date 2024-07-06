import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {BookListComponent} from "./pages/book-list/book-list.component";
import {MyBooksComponent} from "./pages/my-books/my-books.component";
import {WaitingComponent} from "./pages/waiting/waiting.component";
import {ReturnedComponent} from "./pages/returned/returned.component";
import {BorrowedComponent} from "./pages/borrowed/borrowed.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        component: BookListComponent
      },
      {
        path: "my-books",
        component: MyBooksComponent
      },
      {
        path: "waiting",
        component: WaitingComponent
      },
      {
        path: "returned",
        component: ReturnedComponent
      },
      {
        path: "borrowed",
        component: BorrowedComponent
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
