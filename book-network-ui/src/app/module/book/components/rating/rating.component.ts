import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {
  @Input() rate : number= 0;
  maxRate : number = 5;

  get fullStars() {
    return Math.floor(this.rate);
  }

  get halfStar() {
    return this.rate % 1 !== 0;
  }

  get emptyStar() {
    return this.maxRate - Math.ceil(this.rate);
  }
}
