import { Component } from '@angular/core';
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {UserResponse} from "../../../../services/models/user-response";
import {DateFormatterService} from "../../../../services/utils/date-formatter.service";
import {BooksService} from "../../../../services/services/books.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../../services/services/users.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-other-profile',
  standalone: true,
  imports: [],
  templateUrl: './other-profile.component.html',
  styleUrl: './other-profile.component.css'
})

export class OtherProfileComponent {
  bookResponse : PageResponseBookResponse = {}
  page: number = 1;
  size: number = 5;
  userResponse: UserResponse = {};
  dateFormatter : DateFormatterService;

  constructor(
    private bookService : BooksService,
    private router: Router,
    private usersService: UsersService,
    private activeRoute : ActivatedRoute,
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
    const userId = this.activeRoute.snapshot.params["id"];

    this.usersService.().subscribe({
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

}
