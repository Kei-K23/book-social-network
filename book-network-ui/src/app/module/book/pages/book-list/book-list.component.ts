import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../../../services/services/books.service";
import {Router} from "@angular/router";
import {BookResponse} from "../../../../services/models/book-response";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit{
  bookResponse : PageResponseBookResponse = {}
  page: number = 0;
  size: number = 5;

  constructor(
    private bookService : BooksService,
    private router : Router
  ) {
  }

  // Run when the page load
  ngOnInit() {
    this.findAllBooks();
  }

  private findAllBooks() {
    // Get all books
    this.bookService.getAllBooks({
      size: this.size,
      page: this.page
    }).subscribe({
      next: res => {
        this.bookResponse = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
