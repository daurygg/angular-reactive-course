import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import {
  BehaviorSubject,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  map,
  Observable,
} from 'rxjs';

import { type Movie } from '@core/models/movie.model';
import { HomeStoreService } from '@store/home-store.service';
import { SearchStateService } from '../search-state.service';

@Component({
  selector: 'app-master-movie',
  templateUrl: './master-movie.component.html',
  styleUrl: './master-movie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterMovieComponent implements OnInit {
  public searchSubject = new BehaviorSubject<string>('');
  public filterMovies$: Observable<Movie[]> = EMPTY;

  constructor(
    private _homeStoreService: HomeStoreService,
    private _searchStateService: SearchStateService
  ) {}

  ngOnInit(): void {
    this.filterMovies$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      concatMap((text) => {
        return this._homeStoreService.movies$.pipe(
          map((movies) =>
            movies.filter(({ title }) =>
              title.toLocaleLowerCase().includes(text.toLocaleLowerCase())
            )
          )
        );
      })
    );
  }

  public loadMovie(movie: Movie): void {
    this._searchStateService.setMovie(movie);
  }
}
