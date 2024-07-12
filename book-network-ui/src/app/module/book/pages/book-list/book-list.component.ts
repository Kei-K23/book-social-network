import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../../../services/services/books.service";
import {BookResponse} from "../../../../services/models/book-response";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {NgForOf} from "@angular/common";
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {NgxPaginationModule} from "ngx-pagination";
import {ToastrService} from "ngx-toastr";
import {JwtTokenService} from "../../../../services/jwt-token/jwt-token.service";
import {FeedbackModalComponent} from "../../components/feedback-modal/feedback-modal.component";
import {BookTransactionResponse} from "../../../../services/models/book-transaction-response";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {FavoritesService} from "../../../../services/services/favorites.service";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    NgForOf,
    BookCardComponent,
    NgxPaginationModule,
    FeedbackModalComponent,
    FormsModule
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit{
  bookResponse : PageResponseBookResponse = {}
  page: number = 1;
  size: number = 8;
  userId : number = 0;
  selectedBookForFeedback : BookTransactionResponse = {}
  rating : number = 0;

  constructor(
    private bookService : BooksService,
    private favoritesService: FavoritesService,
    private toastr: ToastrService,
    private jwtTokenService : JwtTokenService,
    private router : Router
  ) {
  }

  // Fetch all books pages data when the page load
  ngOnInit() {
    this.findAllBooks();
    this.userId = this.jwtTokenService.getValueFromJwt("userId") || 0;
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
        this.toastr.error(err.error.error);
      }
    })
  }

  pageChange(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  onEdit(book: BookResponse) {
    this.router.navigate([`/books/edit/${book.id}`])
  }

  borrowBook(book : BookResponse) {
    if (!book || !book.id) {
      this.toastr.error('Book is missing to borrow');
      return;
    }

    this.bookService.borrowBook(
      {
        "book-id": book.id
      }
    ).subscribe({
      next: value => {
        // Success borrowed book
        this.toastr.success('Successfully borrowed the book');
      },
      error: err => {
        console.log(err)
        // Error borrowed book
        this.toastr.error(err.error.error);
      }
    })
  }

  onFeedback(book: BookResponse) {
    this.selectedBookForFeedback.id = book.id
  }

  // TODO: Need to refactor the process of reactivity for rating state
  onFeedbackRating(rating: { rating: number; id: number }) {
    this.bookResponse.content?.map(b => {
      if (b.id === rating.id) {
        b.rate = rating.rating;
      }
      return b;
    });
  }

  onSearch(name: string) {
    if (name === "" || !name) {
      this.findAllBooks();
      return;
    }
    this.bookService.getBookByName({
      "book-name": name,
      size: this.size,
      page: this.page !== 0 ? this.page - 1 : 0
    }).subscribe({
      next: value => {
        this.bookResponse = value;
      },
      error: err => this.toastr.error(err.error.error)
    })
  }

  onFavorite(book: BookResponse) {
    this.favoritesService.save1(
      {
        "book-id": book.id!
      }
    ).subscribe({
      next: value => this.toastr.success("Successfully added the book to favorite list"),
      error: err => this.toastr.error(err.error.error)
    });
  }
}
