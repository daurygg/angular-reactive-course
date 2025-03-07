import { Component, Input } from '@angular/core';
import {type Movie } from '@core/models/movie.model';
import { HomeStoreService } from '@store/home-store.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input({required: true}) public movie!: Movie

  public isLike = false;


  constructor(private _homeStoreService: HomeStoreService) {

  }

likeMovie() : void {
  this.isLike = !this.isLike;

  this._homeStoreService.likeMovie(this.movie.id,this.isLike).subscribe({
    next:({success}) => console.log(success, this.movie.id),
    error:(error)=> {
      console.log(error.message);
      this.isLike = false;
    }
  });
}
}
