import { Component, OnInit } from '@angular/core';

import { EMPTY, map, Observable } from 'rxjs';

import { type Movie } from '@core/models/movie.model';
import { MoviesService } from '@core/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public topMovies$: Observable<Movie[]> = EMPTY;
  public normalMovies$: Observable<Movie[]> = EMPTY;

  constructor(private _moviesService: MoviesService) {}

  ngOnInit(): void {
    const movies$ = this._moviesService.getMovies();

    this.topMovies$ = movies$.pipe(
      map((data) => data.filter(({ popularity }) => popularity >= 1000))
    );
    this.normalMovies$ = movies$.pipe(
      map((data) => data.filter(({ popularity }) => popularity < 1000))
    );
  }
}
