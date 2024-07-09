import {Component, OnInit} from '@angular/core';
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {NgForOf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BooksService} from "../../../../services/services/books.service";
import {ToastrService} from "ngx-toastr";
import {Router, RouterLink} from "@angular/router";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [
    BookCardComponent,
    NgForOf,
    NgxPaginationModule,
    RouterLink
  ],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.css'
})
export class MyBooksComponent implements OnInit{
  bookResponse : PageResponseBookResponse = {}
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
    this.bookService.getAllBooksByOwner({
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
            error: err =>   {}
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
            error: err =>  {}
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

  // onDelete(book: BookResponse) {
  //   if (!book || book.id === undefined) {
  //     this.toastr.error("Cannot delete the book");
  //   }
  //
  //   this.bookService.delete({
  //     "book-id": book.id!
  //   }).subscribe({
  //     next: value => {
  //       if (book.shareable) {
  //         this.bookService.updateShareableStatus({
  //           "book-id": book.id!
  //         }).subscribe({
  //           next: value1 => {
  //             // Implement something
  //           },
  //           error: err =>  {}
  //         })
  //       }
  //       book.shareable = !book.shareable;
  //       book.archived = !book.archived;
  //       this.toastr.success("Book archive status updated successfully");
  //     },
  //     error: err => {
  //       this.toastr.error(err.error.error);
  //     }
  //   });
  // }
}
