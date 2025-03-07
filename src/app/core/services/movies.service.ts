import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type MovieFetch,type Movie } from '@core/models/movie.model';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
private _THE_MOVIE_DB_API = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2024-01-01&release_date.lte=2024-12-31&sort_by=popularity.desc';
private _JSON_PLACEHOLDER_API = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private _httpClient: HttpClient) { }

  getMovies(): Observable<Movie[]> {
return this._httpClient
      .get<MovieFetch>(
        this._THE_MOVIE_DB_API,
        {
          headers: new HttpHeaders({
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWE5MTljYjdlNjYzM2E3YjQ5YTgwYzUzMDkyZGVlOSIsIm5iZiI6MTc0MTEwMTI2Ni44OTIsInN1YiI6IjY3YzcxOGQyNTk4ZTIxMzA0YTA0ZjM5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gXIALW4D4t-fl_eX4xcs1QMiroumwmg74TReP6jvzzs',
          }),
        }
      ).pipe(
        map(({results})=> results),
        shareReplay()
      )
  }

  public fakeLike(movieId: number, isLike: boolean): Observable<{success: boolean}>{
    return this._httpClient.post<{success: boolean}>(
      this._JSON_PLACEHOLDER_API,{ movieId, success:isLike }
    )
  }

}
