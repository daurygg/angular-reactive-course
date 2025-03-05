
import { Component, OnInit } from '@angular/core';

import { type Movie } from '@core/models/movie.model';
import { MoviesService } from '@core/services/movies.service';
import { EMPTY, map, Observable } from 'rxjs';
import { HomeStateService } from './home-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public topMovies$: Observable<Movie[]> = EMPTY;
  public normalMovies$: Observable<Movie[]> = EMPTY;

  constructor(private MoviesServices: MoviesService, private _homeStateService: HomeStateService) {}

  ngOnInit(): void {
    this.topMovies$ = this.MoviesServices.getMovies()
    .pipe(
      map((data) => data.filter(({ popularity}) => popularity >= 1000) )
    );
    this.normalMovies$ =  this.MoviesServices.getMovies() .pipe(
      map((data) => data.filter(({ popularity}) => popularity >= 1000) )
    );
    this._homeStateService.homeDataSubject$.next({
      name: 'Daury Gomez',
      role: 'Front Developer'
    });
  }

}
