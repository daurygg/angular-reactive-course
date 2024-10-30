import { Component, OnInit } from '@angular/core';

import { delay, EMPTY, finalize, map, Observable } from 'rxjs';

import { type Movie } from '@core/models/movie.model';
import { MoviesService } from '@core/services/movies.service';
import { LoaderStateService } from '@shared/components/loader/loader-state.service';
import { HomeStateService } from './home-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [LoaderStateService],
})
export class HomeComponent implements OnInit {
  public topMovies$: Observable<Movie[]> = EMPTY;
  public normalMovies$: Observable<Movie[]> = EMPTY;

  constructor(
    private _moviesService: MoviesService,
    private _homeStateService: HomeStateService,
    private _loaderStateService: LoaderStateService
  ) {}

  ngOnInit(): void {
    //* Set loader in true
    this._loaderStateService.showLoader();
    const movies$ = this._moviesService.getMovies().pipe(
      delay(600),
      finalize(() => {
        //* Set loader in false
        this._loaderStateService.hideLoader();
      })
    );

    this.topMovies$ = movies$.pipe(
      map((data) => data.filter(({ popularity }) => popularity >= 1000))
    );
    this.normalMovies$ = movies$.pipe(
      map((data) => data.filter(({ popularity }) => popularity < 1000))
    );

    //* Set test data to Navbar component
    this._homeStateService.homeDataSubject.next({
      name: 'Alexander Avila',
      role: 'Frontend Developer',
    });
  }
}
