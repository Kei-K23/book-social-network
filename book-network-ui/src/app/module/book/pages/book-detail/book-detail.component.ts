import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../../../services/services/books.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RatingComponent} from "../../components/rating/rating.component";
import {BookResponse} from "../../../../services/models/book-response";
import {NgIf} from "@angular/common";
import {BookTransactionResponse} from "../../../../services/models/book-transaction-response";
import {FeedbackModalComponent} from "../../components/feedback-modal/feedback-modal.component";
import {FavoritesService} from "../../../../services/services/favorites.service";

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RatingComponent,
    NgIf,
    FeedbackModalComponent
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit{
  book: BookResponse = {
    title: "",
    isbn: "",
    shareable: true,
    synopsis: "",
    author: "",
    rate: 0
  };
  bookId: number | undefined;
  selectedImage: string | undefined;
  selectedBookForFeedback : BookTransactionResponse = {}

  constructor(
    private booksService: BooksService,
    private favoritesService: FavoritesService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    const bookId = this.activeRoute.snapshot.params["id"];
    if (bookId) {
      this.bookId = bookId;
      this.booksService.getBookById({
        "book-id": bookId
      }).subscribe({
        next: book => {
          this.book = {
            id: book.id,
            title: book.title as string,
            author: book.author as string,
            isbn: book.isbn as string,
            synopsis: book.synopsis as string,
            shareable: book.shareable,
            rate: book.rate,
            owner: book.owner
          };
          if (book.coverImage) {
            this.selectedImage = "data:image/jpg;base64, " + book.coverImage;
            this.book.coverImage = book.coverImage;
          }
        },
        error: err => {
          this.toastr.error(err.error.error);
        }
      })
    }
  }

  onBorrow() {
    if (!this.book || !this.book.id) {
      this.toastr.error('Book is missing to borrow');
      return;
    }

    this.booksService.borrowBook(
      {
        "book-id": this.book.id
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

  onFeedback() {
    this.selectedBookForFeedback.id = this.bookId
  }

  onFeedbackRating(rating: { rating: number; id: number }) {
    this.book.rate = rating.rating;
  }

  onFavorite(id: number | undefined) {
    this.favoritesService.save1(
      {
        "book-id": id!
      }
    ).subscribe({
      next: value => this.toastr.success("Successfully added the book to favorite list"),
      error: err => this.toastr.error(err.error.error)
    });
  }
}
