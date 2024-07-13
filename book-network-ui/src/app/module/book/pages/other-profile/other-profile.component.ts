import {Component, OnInit} from '@angular/core';
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {UserResponse} from "../../../../services/models/user-response";
import {DateFormatterService} from "../../../../services/utils/date-formatter.service";
import {BooksService} from "../../../../services/services/books.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UsersService} from "../../../../services/services/users.service";
import {ToastrService} from "ngx-toastr";
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {BookResponse} from "../../../../services/models/book-response";
import {FeedbackModalComponent} from "../../components/feedback-modal/feedback-modal.component";
import {BookTransactionResponse} from "../../../../services/models/book-transaction-response";
import {FavoritesService} from "../../../../services/services/favorites.service";
import {LocalStorageService} from "../../../../services/localStorage/local-storage.service";
import {KEYS} from "../../../../constants/keys";
import {JwtTokenService} from "../../../../services/jwt-token/jwt-token.service";

@Component({
  selector: 'app-other-profile',
  standalone: true,
  imports: [
    BookCardComponent,
    NgForOf,
    NgIf,
    NgxPaginationModule,
    RouterLink,
    FeedbackModalComponent
  ],
  templateUrl: './other-profile.component.html',
  styleUrl: './other-profile.component.css'
})

export class OtherProfileComponent implements OnInit{
  selectedBookForFeedback : BookTransactionResponse = {}
  bookResponse : PageResponseBookResponse = {}
  page: number = 1;
  size: number = 8;
  userResponse: UserResponse = {};
  dateFormatter : DateFormatterService;
  isAuthUser: boolean = false;

  constructor(
    private bookService : BooksService,
    private jwtTokenService : JwtTokenService,
    private router: Router,
    private usersService: UsersService,
    private activeRoute : ActivatedRoute,
    private toastr: ToastrService,
    formatter: DateFormatterService,
    private favoritesService: FavoritesService,
  ) {
    this.dateFormatter = formatter;
  }

  ngOnInit() {
    const userId = this.activeRoute.snapshot.params["id"];
    this.isAuthUser = this.jwtTokenService.getValueFromJwt("userId") === +userId;
    this.getAuthUserData();
    this.findAllBooks();
  }

  getAuthUserData() {
    const userId = this.activeRoute.snapshot.params["id"];
    this.usersService.getUserById(
      {
        "user-id": userId
      }
    ).subscribe({
      next: value => {
        this.userResponse = value;
      },
      error: err => this.toastr.error(err.error.error)
    });
  }

  pageChange(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  private findAllBooks() {
    const userId = this.activeRoute.snapshot.params["id"];
    // Get all books
    this.bookService.getAllBooksByOwnerId({
      "ownerId" : userId,
      size: this.size,
      page: this.page !== 0 ? this.page - 1 : 0
    }).subscribe({
      next: res => {
        this.bookResponse = res;
      },
      error: err =>  this.toastr.error(err.error.error)
    })
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
