/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { approveReturnedBorrowedBook } from '../fn/books/approve-returned-borrowed-book';
import { ApproveReturnedBorrowedBook$Params } from '../fn/books/approve-returned-borrowed-book';
import { BookResponse } from '../models/book-response';
import { borrowBook } from '../fn/books/borrow-book';
import { BorrowBook$Params } from '../fn/books/borrow-book';
import { deleteBookById } from '../fn/books/delete-book-by-id';
import { DeleteBookById$Params } from '../fn/books/delete-book-by-id';
import { getAllBooks } from '../fn/books/get-all-books';
import { GetAllBooks$Params } from '../fn/books/get-all-books';
import { getAllBooksByOwner } from '../fn/books/get-all-books-by-owner';
import { GetAllBooksByOwner$Params } from '../fn/books/get-all-books-by-owner';
import { getAllBooksByOwnerId } from '../fn/books/get-all-books-by-owner-id';
import { GetAllBooksByOwnerId$Params } from '../fn/books/get-all-books-by-owner-id';
import { getAllBorrowedBooksByOwner } from '../fn/books/get-all-borrowed-books-by-owner';
import { GetAllBorrowedBooksByOwner$Params } from '../fn/books/get-all-borrowed-books-by-owner';
import { getAllReturnedBooksByOwner } from '../fn/books/get-all-returned-books-by-owner';
import { GetAllReturnedBooksByOwner$Params } from '../fn/books/get-all-returned-books-by-owner';
import { getBookById } from '../fn/books/get-book-by-id';
import { GetBookById$Params } from '../fn/books/get-book-by-id';
import { getBookByName } from '../fn/books/get-book-by-name';
import { GetBookByName$Params } from '../fn/books/get-book-by-name';
import { PageResponseBookResponse } from '../models/page-response-book-response';
import { PageResponseBookTransactionResponse } from '../models/page-response-book-transaction-response';
import { returnBorrowedBook } from '../fn/books/return-borrowed-book';
import { ReturnBorrowedBook$Params } from '../fn/books/return-borrowed-book';
import { save2 } from '../fn/books/save-2';
import { Save2$Params } from '../fn/books/save-2';
import { updateArchivedStatus } from '../fn/books/update-archived-status';
import { UpdateArchivedStatus$Params } from '../fn/books/update-archived-status';
import { updateShareableStatus } from '../fn/books/update-shareable-status';
import { UpdateShareableStatus$Params } from '../fn/books/update-shareable-status';
import { uploadBookCover } from '../fn/books/upload-book-cover';
import { UploadBookCover$Params } from '../fn/books/upload-book-cover';

@Injectable({ providedIn: 'root' })
export class BooksService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllBooks()` */
  static readonly GetAllBooksPath = '/books';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBooks()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBooks$Response(params?: GetAllBooks$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBookResponse>> {
    return getAllBooks(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBooks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBooks(params?: GetAllBooks$Params, context?: HttpContext): Observable<PageResponseBookResponse> {
    return this.getAllBooks$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBookResponse>): PageResponseBookResponse => r.body)
    );
  }

  /** Path part for operation `save2()` */
  static readonly Save2Path = '/books';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save2$Response(params: Save2$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return save2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save2(params: Save2$Params, context?: HttpContext): Observable<number> {
    return this.save2$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadBookCover()` */
  static readonly UploadBookCoverPath = '/books/cover/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadBookCover()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBookCover$Response(params: UploadBookCover$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadBookCover(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadBookCover$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBookCover(params: UploadBookCover$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadBookCover$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `borrowBook()` */
  static readonly BorrowBookPath = '/books/borrow/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `borrowBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowBook$Response(params: BorrowBook$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return borrowBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `borrowBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowBook(params: BorrowBook$Params, context?: HttpContext): Observable<number> {
    return this.borrowBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `returnBorrowedBook()` */
  static readonly ReturnBorrowedBookPath = '/books/borrow/return/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `returnBorrowedBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnBorrowedBook$Response(params: ReturnBorrowedBook$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return returnBorrowedBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `returnBorrowedBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnBorrowedBook(params: ReturnBorrowedBook$Params, context?: HttpContext): Observable<number> {
    return this.returnBorrowedBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `approveReturnedBorrowedBook()` */
  static readonly ApproveReturnedBorrowedBookPath = '/books/borrow/return/approve/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `approveReturnedBorrowedBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnedBorrowedBook$Response(params: ApproveReturnedBorrowedBook$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return approveReturnedBorrowedBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `approveReturnedBorrowedBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnedBorrowedBook(params: ApproveReturnedBorrowedBook$Params, context?: HttpContext): Observable<number> {
    return this.approveReturnedBorrowedBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateShareableStatus()` */
  static readonly UpdateShareableStatusPath = '/books/shareable/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateShareableStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus$Response(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateShareableStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateShareableStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateShareableStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateArchivedStatus()` */
  static readonly UpdateArchivedStatusPath = '/books/archived/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArchivedStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus$Response(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateArchivedStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateArchivedStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateArchivedStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getBookById()` */
  static readonly GetBookByIdPath = '/books/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBookById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookById$Response(params: GetBookById$Params, context?: HttpContext): Observable<StrictHttpResponse<BookResponse>> {
    return getBookById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBookById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookById(params: GetBookById$Params, context?: HttpContext): Observable<BookResponse> {
    return this.getBookById$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookResponse>): BookResponse => r.body)
    );
  }

  /** Path part for operation `deleteBookById()` */
  static readonly DeleteBookByIdPath = '/books/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteBookById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBookById$Response(params: DeleteBookById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteBookById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteBookById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBookById(params: DeleteBookById$Params, context?: HttpContext): Observable<void> {
    return this.deleteBookById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getBookByName()` */
  static readonly GetBookByNamePath = '/books/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBookByName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookByName$Response(params?: GetBookByName$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBookResponse>> {
    return getBookByName(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBookByName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookByName(params?: GetBookByName$Params, context?: HttpContext): Observable<PageResponseBookResponse> {
    return this.getBookByName$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBookResponse>): PageResponseBookResponse => r.body)
    );
  }

  /** Path part for operation `getAllReturnedBooksByOwner()` */
  static readonly GetAllReturnedBooksByOwnerPath = '/books/returned';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllReturnedBooksByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllReturnedBooksByOwner$Response(params?: GetAllReturnedBooksByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBookTransactionResponse>> {
    return getAllReturnedBooksByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllReturnedBooksByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllReturnedBooksByOwner(params?: GetAllReturnedBooksByOwner$Params, context?: HttpContext): Observable<PageResponseBookTransactionResponse> {
    return this.getAllReturnedBooksByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBookTransactionResponse>): PageResponseBookTransactionResponse => r.body)
    );
  }

  /** Path part for operation `getAllBooksByOwner()` */
  static readonly GetAllBooksByOwnerPath = '/books/owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBooksByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBooksByOwner$Response(params?: GetAllBooksByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBookResponse>> {
    return getAllBooksByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBooksByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBooksByOwner(params?: GetAllBooksByOwner$Params, context?: HttpContext): Observable<PageResponseBookResponse> {
    return this.getAllBooksByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBookResponse>): PageResponseBookResponse => r.body)
    );
  }

  /** Path part for operation `getAllBooksByOwnerId()` */
  static readonly GetAllBooksByOwnerIdPath = '/books/owner/{owner-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBooksByOwnerId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBooksByOwnerId$Response(params: GetAllBooksByOwnerId$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBookResponse>> {
    return getAllBooksByOwnerId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBooksByOwnerId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBooksByOwnerId(params: GetAllBooksByOwnerId$Params, context?: HttpContext): Observable<PageResponseBookResponse> {
    return this.getAllBooksByOwnerId$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBookResponse>): PageResponseBookResponse => r.body)
    );
  }

  /** Path part for operation `getAllBorrowedBooksByOwner()` */
  static readonly GetAllBorrowedBooksByOwnerPath = '/books/borrowed';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBorrowedBooksByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBorrowedBooksByOwner$Response(params?: GetAllBorrowedBooksByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBookTransactionResponse>> {
    return getAllBorrowedBooksByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBorrowedBooksByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBorrowedBooksByOwner(params?: GetAllBorrowedBooksByOwner$Params, context?: HttpContext): Observable<PageResponseBookTransactionResponse> {
    return this.getAllBorrowedBooksByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBookTransactionResponse>): PageResponseBookTransactionResponse => r.body)
    );
  }

}
