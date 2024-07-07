import {Component, OnInit} from '@angular/core';
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BooksService} from "../../../../services/services/books.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {NgForOf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {RatingComponent} from "../../components/rating/rating.component";
import {PageResponseBookTransactionResponse} from "../../../../services/models/page-response-book-transaction-response";
import {BookTransactionResponse} from "../../../../services/models/book-transaction-response";

@Component({
  selector: 'app-borrowed',
  standalone: true,
  imports: [
    BookCardComponent,
    NgForOf,
    NgxPaginationModule,
    RatingComponent
  ],
  templateUrl: './borrowed.component.html',
  styleUrl: './borrowed.component.css'
})
export class BorrowedComponent implements OnInit {
  bookResponse : PageResponseBookTransactionResponse = {}
  page: number = 1;
  size: number = 5;

  constructor(
    private bookService : BooksService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  // Fetch all books pages data when the page load
  ngOnInit() {
    this.findAllBooks();
  }

  private findAllBooks() {
    // Get all books
    this.bookService.getAllBorrowedBooksByOwner({
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

  onReturnBorrowedBook(book : BookTransactionResponse) {
    this.bookService.returnBorrowedBook({
      "book-id": book.id!,
    }).subscribe({
      next: value => {
        book.returned = true;
        this.toastr.success("Successfully returned borrowed book");
      },
      error: err => this.toastr.error(err.error.error)
    })

  }
}
