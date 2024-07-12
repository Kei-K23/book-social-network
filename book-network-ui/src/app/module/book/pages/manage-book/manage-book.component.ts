import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../../../services/services/books.service";
import { BookRequest } from "../../../../services/models/book-request";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormsModule } from "@angular/forms";
import {FeedbacksService} from "../../../../services/services/feedbacks.service";
import {PageResponseFeedbackResponse} from "../../../../services/models/page-response-feedback-response";

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.css'
})
export class ManageBookComponent implements OnInit {
  bookRequest: BookRequest = {
    title: "",
    isbn: "",
    shareable: true,
    synopsis: "",
    author: ""
  };
  feedbackResponses: PageResponseFeedbackResponse = {}
  bookId: number | undefined;
  selectedCoverImg: any;
  selectedImage: string | undefined;

  constructor(
    private booksService: BooksService,
    private feedbacksService: FeedbacksService,
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
          this.bookRequest = {
            id: book.id,
            title: book.title as string,
            author: book.author as string,
            isbn: book.isbn as string,
            synopsis: book.synopsis as string,
            shareable: book.shareable
          };
          if (book.coverImage) {
            this.selectedImage = "data:image/jpg;base64, " + book.coverImage;
            this.bookRequest.coverImg = book.coverImage;
          }
          this.feedbacksService.getAllFeedbacksByBookId(
            {
              "book-id": book.id!
            },
          ).subscribe({
            next: value => {
              this.feedbackResponses = value;
            },
            error : err => this.toastr.error(err.error.error)
          })
        },
        error: err => {
          this.toastr.error(err.error.error);
        }
      })
    }
  }

  saveBook() {
    let req: BookRequest;
    if (this.bookId) {
      req = {
        ...this.bookRequest,
        id: this.bookId
      }
    } else {
      req = this.bookRequest
    }
    console.log(req);

    this.booksService.save2({
      body: req
    }).subscribe({
      next: value => {
        // If selected cover image exists that mean user upload new image, then upload the image to store in the backend storage
        if (this.selectedCoverImg) {
          this.booksService.uploadBookCover({
            "book-id": value,
            body: {
              file: this.selectedCoverImg
            }
          }).subscribe({
            next: v => {
              this.toastr.success("Book cover image uploaded successfully");
            },
            error: err => {
              this.toastr.error(err.error.error);
            }
          })
        }
        if (this.bookId) {
          this.toastr.success("Successfully updated the book");
        } else {
          this.toastr.success("Successfully created book");
        }
        this.router.navigate(['/books/my-books']);
      },
      error: err => {
        this.toastr.error(err.error.error);
      }
    })
  }

  onFileSelected($event: any) {
    this.selectedCoverImg = $event.target.files[0];
    if (this.selectedCoverImg) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(this.selectedCoverImg);
    }
  }

  onCancel() {
    // Clear the state
    this.bookRequest = {
      title: "",
      isbn: "",
      shareable: true,
      synopsis: "",
      author: ""
    };
    this.selectedImage = "";
    this.selectedCoverImg = undefined;

    this.router.navigate(['/books/my-books']);
  }
}
