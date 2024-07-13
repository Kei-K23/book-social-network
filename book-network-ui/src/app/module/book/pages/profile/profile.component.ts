import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../../services/services/users.service";
import {UserResponse} from "../../../../services/models/user-response";
import {ToastrService} from "ngx-toastr";
import {NgForOf, NgIf} from "@angular/common";
import {DateFormatterService} from "../../../../services/utils/date-formatter.service";
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {FeedbackModalComponent} from "../../components/feedback-modal/feedback-modal.component";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BookResponse} from "../../../../services/models/book-response";
import {BooksService} from "../../../../services/services/books.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    BookCardComponent,
    FeedbackModalComponent,
    FormsModule,
    NgForOf,
    NgxPaginationModule,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
    bookResponse : PageResponseBookResponse = {}
    page: number = 1;
    size: number = 8;
    userResponse: UserResponse = {};
    dateFormatter : DateFormatterService;

    constructor(
      private bookService : BooksService,
      private router: Router,
      private usersService: UsersService,
      private toastr: ToastrService,
      formatter: DateFormatterService
    ) {
      this.dateFormatter = formatter;
    }

    ngOnInit() {
      this.getAuthUserData();
      this.findAllBooks();
    }

    getAuthUserData() {
      this.usersService.getLoginUser().subscribe({
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
    // Get all books
    this.bookService.getAllBooksByOwner({
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

  onShare(book: BookResponse) {
    if (!book || book.id === undefined) {
      this.toastr.error("Cannot update book shareable status");
    }

    this.bookService.updateShareableStatus({
      "book-id": book.id!
    }).subscribe({
      next: value => {
        if (book.archived) {
          this.bookService.updateArchivedStatus({
            "book-id": book.id!
          }).subscribe({
            next: value1 => {
              // Implement something
            },
            error: err =>  this.toastr.error(err.error.error)
          })
        }

        book.shareable = !book.shareable;
        book.archived = !book.archived;
        this.toastr.success("Book shareable status updated successfully");
      },
      error: err => {
        this.toastr.error(err.error.error);
      }
    });
  }

  onArchive(book: BookResponse) {
    if (!book || book.id === undefined) {
      this.toastr.error("Cannot update book archive status");
    }

    this.bookService.updateArchivedStatus({
      "book-id": book.id!
    }).subscribe({
      next: value => {
        if (book.shareable) {
          this.bookService.updateShareableStatus({
            "book-id": book.id!
          }).subscribe({
            next: value1 => {
              // Implement something
            },
            error: err =>  this.toastr.error(err.error.error)
          })
        }
        book.shareable = !book.shareable;
        book.archived = !book.archived;
        this.toastr.success("Book archive status updated successfully");
      },
      error: err => {
        this.toastr.error(err.error.error);
      }
    });
  }

  onDelete(book: BookResponse) {
    if (!book || book.id === undefined) {
      this.toastr.error("Cannot delete the book");
    }

    this.bookService.deleteBookById({
      "book-id": book.id!
    }).subscribe({
      next: value => {
        // Remove the item also from client state
        this.bookResponse.content = this.bookResponse.content?.filter(b => b.id !== book.id);
        this.toastr.success("Book with id " + book.id + " deleted successfully");
      },
      error: err => {
        this.toastr.error(err.error.error);
      }
    });
  }
}
