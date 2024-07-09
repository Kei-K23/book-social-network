import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookTransactionResponse} from "../../../../services/models/book-transaction-response";
import {FeedbacksService} from "../../../../services/services/feedbacks.service";
import {FormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-feedback-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './feedback-modal.component.html',
  styleUrl: './feedback-modal.component.css'
})
export class FeedbackModalComponent {

  comment: string = "";
  rate: number = 0;

  private _book: BookTransactionResponse = {};
  @Output() private rating : EventEmitter<{rating: number, id : number}> = new EventEmitter<{rating: number, id : number}>();


  constructor(
    private feedbacksService : FeedbacksService,
    private toastr : ToastrService
  ) {
  }

  @Input()
  set book(value: BookTransactionResponse) {
    this._book = value;
  }

  get book() {
    return this._book
  }

  onCloseModal() {
    this._book = {};
  }

  onSubmit() {
    this.feedbacksService.save({
      body : {
        bookId: this._book.id!,
        comment: this.comment,
        rate: this.rate
      }
    }).subscribe({
      next: value => {
        this.toastr.success("Successfully give a feedback");
        this._book.rate = this.rate;
        this.rating.emit({rating: this.rate, id: this._book.id!});

        // Clear the state, after success of give feedback and close the modal
        this.comment = "";
        this.rate = 0;
        this.onCloseModal();
      },
      error: err => this.toastr.error(err.error.error)
    })
  }
}
