import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, shareReplay } from 'rxjs';

import { type MovieFetch, type Movie } from '@core/models/movie.model';
import {
  type MovieVideo,
  type MovieVideoFetch,
} from '@core/models/movie-video.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private _THE_MOVIE_DB_API = 'https://api.themoviedb.org/3';
  private _JSON_PLACEHOLDER_API = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private _httpClient: HttpClient) {}

  public getMovies(): Observable<Movie[]> {
    return this._httpClient
      .get<MovieFetch>(
        `${this._THE_MOVIE_DB_API}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2024-01-01&release_date.lte=2024-12-31&sort_by=popularity.desc`,
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

  public getVideos(movieId: number): Observable<MovieVideo[]> {
    return this._httpClient
      .get<MovieVideoFetch>(
        `${this._THE_MOVIE_DB_API}/movie/${movieId}/videos`,
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

  public fakeLike(movieId: number): Observable<{ success: boolean }> {
    return this._httpClient
      .post<{ success: boolean }>(this._JSON_PLACEHOLDER_API, {
        movieId,
        success: true,
      })
      .pipe(map(({ success }) => ({ success })));
  }
}
