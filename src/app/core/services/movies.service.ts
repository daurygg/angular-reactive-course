import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, shareReplay } from 'rxjs';

import { type MovieFetch, type Movie } from '@core/models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private _httpClient: HttpClient) {}

  public getMovies(): Observable<Movie[]> {
    return this._httpClient
      .get<MovieFetch>(
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2024-01-01&release_date.lte=2024-12-31&sort_by=popularity.desc',
        {
          headers: new HttpHeaders({
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjA2ZjNiNWI4ZTUxOWI5Y2Q1NTVhYTJlYTUwZGViMSIsIm5iZiI6MTcyOTI2MzAwMS4wNzEzMjYsInN1YiI6IjVlNzNiMDU4MmYzYjE3MDAxMTRjYzFlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qbadMbiuSvCAlDFqgPdPhSBz4NODTUTqPzAEBBbLkIs',
          }),
        }
      )
      .pipe(
        map(({ results }) => results),
        shareReplay()
      );
  }
}
