import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { type Movie } from '@core/models/movie.model';

@Injectable()
export class SearchStateService {
  private _movieDataSubject = new Subject<Movie>();
  public movieData$ = this._movieDataSubject.asObservable();

  public setMovie(movie: Movie) {
    this._movieDataSubject.next(movie);
  }
}
