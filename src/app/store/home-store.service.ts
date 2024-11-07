import { Injectable } from '@angular/core';

import { BehaviorSubject, finalize, map, Observable, of, tap } from 'rxjs';

import { type Movie } from '@core/models/movie.model';
import { MoviesService } from '@core/services/movies.service';
import { LoaderStateService } from '@shared/components/loader/loader-state.service';
import { MovieVideo } from '@core/models/movie-video.model';

@Injectable({
  providedIn: 'root',
})
export class HomeStoreService {
  private _moviesSubject = new BehaviorSubject<Movie[]>([]);
  public movies$ = this._moviesSubject.asObservable();
  private _MOVIES_REACTIVE_LOCAL_STORAGE = 'MOVIES_REACTIVE';

  constructor(
    private _moviesService: MoviesService,
    private _loaderStateService: LoaderStateService
  ) {
    this._loadMovies();
  }

  private _loadMovies(): void {
    if (this._existMoviesInLocalStorage()) {
      this.movies$ = of(this._getMoviesFromLocalStorage());
      return;
    }

    //* Set loader in true
    this._loaderStateService.showLoader();
    this.movies$ = this._moviesService.getMovies().pipe(
      // delay(600),
      tap((movies) => this._saveMoviesInLocalStorage(movies)),
      finalize(() => {
        //* Set loader in false
        this._loaderStateService.hideLoader();
      })
    );
  }

  public filterByRate(type: 'TOP' | 'NORMAL'): Observable<Movie[]> {
    return this.movies$.pipe(
      map((data) =>
        data.filter(({ popularity }) => {
          if (type === 'TOP') return popularity >= 2000;
          return popularity < 2000;
        })
      )
    );
  }

  public likeMovie(movieId: number): Observable<{
    success: boolean;
  }> {
    return this._moviesService.fakeLike(movieId);
  }

  public getVideos(movieId: number): Observable<MovieVideo[]> {
    return this._moviesService.getVideos(movieId);
  }

  public getCurrentMovies(): Movie[] {
    if (this._existMoviesInLocalStorage())
      return this._getMoviesFromLocalStorage();
    return [];
  }

  //* LOCAL STORAGE METHODS
  private _saveMoviesInLocalStorage(movies: Movie[]): void {
    localStorage.setItem(
      this._MOVIES_REACTIVE_LOCAL_STORAGE,
      JSON.stringify(movies)
    );
  }

  private _existMoviesInLocalStorage(): boolean {
    try {
      const rawMovies = localStorage.getItem(
        this._MOVIES_REACTIVE_LOCAL_STORAGE
      );
      if (rawMovies) return true;
      return false;
    } catch (_) {
      return false;
    }
  }

  private _getMoviesFromLocalStorage(): Movie[] {
    const rawMovies = localStorage.getItem(this._MOVIES_REACTIVE_LOCAL_STORAGE);
    return JSON.parse(rawMovies as string) as Movie[];
  }

  private _deleteMoviesFromLocalStorage(): void {
    localStorage.removeItem(this._MOVIES_REACTIVE_LOCAL_STORAGE);
  }
}
