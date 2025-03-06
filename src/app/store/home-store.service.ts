import { Injectable } from '@angular/core';
import { LoaderStateService } from '../shared/components/services/loader-state.service';
import { BehaviorSubject, delay, finalize, map, Observable } from 'rxjs';
import {type Movie } from '@core/models/movie.model';
import { MoviesService } from '@core/services/movies.service';

@Injectable({
  providedIn: 'root'
})
export class HomeStoreService {
  private _moviesSubject = new BehaviorSubject<Movie[]>([]);
  public movies$ = this._moviesSubject.asObservable();

  constructor(private _loaderStateService: LoaderStateService,   private MoviesServices: MoviesService,) {
    this._loadMovies();
   }

   private _loadMovies(): void {
     //Set Loader en true;
    this._loaderStateService.showLoader();
    this.movies$ = this.MoviesServices.getMovies().pipe(

      finalize(()=> {
         //Set Loader en false;
        this._loaderStateService.hideLoader();
      }),
    )}

    public filterbyRate(filter:'TOP' | 'Normal'):Observable<Movie[]> {
      return this.movies$.pipe(map((data) => data.filter(({ popularity}) => {
        if (filter === 'TOP') return popularity >= 1000;
        return popularity < 1000
      }) ),);
    }
}
