import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {PageResponseFavoriteResponse} from "../../../../services/models/page-response-favorite-response";
import {FavoritesService} from "../../../../services/services/favorites.service";
import {FeedbackModalComponent} from "../../components/feedback-modal/feedback-modal.component";
import {NgForOf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {RatingComponent} from "../../components/rating/rating.component";

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [
    FeedbackModalComponent,
    NgForOf,
    NgxPaginationModule,
    RatingComponent
  ],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit{

  favoriteResponse : PageResponseFavoriteResponse = {}
  page: number = 1;
  size: number = 5;

  constructor(
    private favoritesService : FavoritesService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  // Fetch all books pages data when the page load
  ngOnInit() {
    this.findAllFavorites();
  }

  private findAllFavorites() {
    // Get all books
    this.favoritesService.getAllFavoriteBooksByUser({
      size: this.size,
      page: this.page !== 0 ? this.page - 1 : 0
    }).subscribe({
      next: res => {
        this.favoriteResponse = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  pageChange(page: number) {
    this.page = page;
    this.findAllFavorites();
  }

  onRemove(id: number | undefined) {
    this.favoritesService.delete({
      id : id!
    }).subscribe({
      next: value => {
          // Remove the favorite item from list in client site also
          this.favoriteResponse.content = this.favoriteResponse.content?.filter(f => f.id !== id);
          this.toastr.success("Successfully remove the book from favorite");
        },
      error: err => this.toastr.error(err.error.error)
    })
  }
}
