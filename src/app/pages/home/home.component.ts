import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { type Movie, type MovieFetch } from '@core/models/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public topMovies: Movie[] = [];
  public normalMovies: Movie[] = [];

  constructor(private _httpClient: HttpClient) {}

  ngOnInit(): void {
    this._httpClient
      .get<MovieFetch>(
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2024-01-01&release_date.lte=2024-12-31&sort_by=popularity.desc',
        {
          headers: new HttpHeaders({
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjA2ZjNiNWI4ZTUxOWI5Y2Q1NTVhYTJlYTUwZGViMSIsIm5iZiI6MTcyOTI2MzAwMS4wNzEzMjYsInN1YiI6IjVlNzNiMDU4MmYzYjE3MDAxMTRjYzFlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qbadMbiuSvCAlDFqgPdPhSBz4NODTUTqPzAEBBbLkIs',
          }),
        }
      )
      .subscribe(({ results }) => {
        this.topMovies = results.filter(({ popularity }) => popularity >= 1000);
        this.normalMovies = results.filter(
          ({ popularity }) => popularity < 1000
        );
      });
  }
}
