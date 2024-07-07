import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookResponse} from "../../../../services/models/book-response";
import {NgIf} from "@angular/common";
import {RatingComponent} from "../rating/rating.component";

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    NgIf,
    RatingComponent
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {

  private _book: BookResponse = {};
  private _bookCover: string | undefined = "";
  private _manage: boolean = false;

  @Output() private share : EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive : EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToFavorite : EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow : EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit : EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details : EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  @Input()
  set book(value: BookResponse) {
    this._book = value;
  }

  get book() {
    return this._book
  }

  get bookCover(): string | undefined {
    if (this._book.coverImage) {
      return "data:image/jpg;base64, " + this._book.coverImage;
    }
    return "/assets/images/noCoverImgIcon.jpg";
  }

  set bookCover(value: string | undefined) {
    this._bookCover = value;
  }

  @Input()
  get manage(): boolean {
    return this._manage;
  }

  set manage(value: boolean) {
    this._manage = value;
  }

  onShowDetail() {
    this.details.emit(this._book);
  }

  onBorrow() {
    this.borrow.emit(this._book);
  }

  onFavorite() {
    this.addToFavorite.emit(this._book);
  }

  onEdit() {
    this.edit.emit(this._book);
  }

  onShare() {
    this.share.emit(this._book);
  }

  onArchive() {
    this.archive.emit(this._book);
  }
}
