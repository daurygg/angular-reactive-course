import { Component, Input } from '@angular/core';
import {type Movie } from '@core/models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input({required: true}) public movie!: Movie

  public isLike = false;

likeMovie() : void {
  this.isLike = !this.isLike
}

}
