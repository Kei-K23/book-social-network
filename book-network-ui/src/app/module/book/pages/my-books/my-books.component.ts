import { Component } from '@angular/core';
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {NgForOf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BooksService} from "../../../../services/services/books.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-my-books',
  standalone: true,
    imports: [
        BookCardComponent,
        NgForOf,
        NgxPaginationModule
    ],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.css'
})
export class MyBooksComponent {
  bookResponse : PageResponseBookResponse = {}
  page: number = 1;
  size: number = 5;

  constructor(
    private bookService : BooksService,
    private toastr: ToastrService
  ) {
  }

  // Fetch all books pages data when the page load
  ngOnInit() {
    this.findAllBooks();
  }

  private findAllBooks() {
    // Get all books
    this.bookService.getAllBooks({
      size: this.size,
      page: this.page !== 0 ? this.page - 1 : 0
    }).subscribe({
      next: res => {
        this.bookResponse = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  pageChange(page: number) {
    this.page = page;
    this.findAllBooks();
  }
}
