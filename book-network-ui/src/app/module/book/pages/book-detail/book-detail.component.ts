import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../../../services/services/books.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {BookRequest} from "../../../../services/models/book-request";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RatingComponent} from "../../components/rating/rating.component";
import {BookResponse} from "../../../../services/models/book-response";
import {NgIf} from "@angular/common";
import {BookTransactionResponse} from "../../../../services/models/book-transaction-response";
import {FeedbackModalComponent} from "../../components/feedback-modal/feedback-modal.component";

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
    private router: Router,
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

  }

  onFeedback() {
    this.selectedBookForFeedback.id = this.bookId
  }

  onFeedbackRating(rating: { rating: number; id: number }) {
    this.book.rate = rating.rating;
  }

  onFavorite() {

  }
}
