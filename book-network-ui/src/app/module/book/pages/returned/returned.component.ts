import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {RatingComponent} from "../../components/rating/rating.component";
import {PageResponseBookTransactionResponse} from "../../../../services/models/page-response-book-transaction-response";
import {BooksService} from "../../../../services/services/books.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {BookTransactionResponse} from "../../../../services/models/book-transaction-response";

@Component({
  selector: 'app-returned',
  standalone: true,
    imports: [
        NgForOf,
        NgxPaginationModule,
        RatingComponent
    ],
  templateUrl: './returned.component.html',
  styleUrl: './returned.component.css'
})
export class ReturnedComponent implements OnInit{
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
    this.bookService.getAllReturnedBooksByOwner({
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

  onReturnApprove(book: BookTransactionResponse) {
    this.bookService.approveReturnedBorrowedBook({
      "book-id": book.id!
    }).subscribe({
      next: value => {
        book.returnApprove = true;
        this.toastr.success("Approved the returned book successfully")
      },
      error: err => this.toastr.error(err.error.error)
    });

  }
}
