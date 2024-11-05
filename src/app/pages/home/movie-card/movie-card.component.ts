import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';

import { type Movie } from '@core/models/movie.model';
import { HomeStoreService } from '@store/home-store.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input({ required: true }) public movie!: Movie;
  public isLike = false;

  constructor(private _homeStoreService: HomeStoreService) {}

  public likeMovie(): void {
    this.isLike = true;
    this._homeStoreService.likeMovie(this.movie.id).subscribe({
      next: ({ success }) => console.log(success, this.movie.id),
      error: (error: HttpErrorResponse) => {
        // * SHOW TOAST
        console.error(error.message);
        this.isLike = false;
      },
    });
  }
}
