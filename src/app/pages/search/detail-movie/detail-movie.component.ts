import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { combineLatest, concatMap, map, Observable, startWith } from 'rxjs';

import { type Movie } from '@core/models/movie.model';
import { MovieVideo } from '@core/models/movie-video.model';
import { HomeStoreService } from '@store/home-store.service';
import { SearchStateService } from '../search-state.service';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrl: './detail-movie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailMovieComponent implements OnInit {
  // public movie$!: Observable<Movie>;
  // public movieVideos$!: Observable<MovieVideo[]>;
  public movieWithVideos$!: Observable<Movie & { videos: MovieVideo[] }>;

  constructor(
    private _searchStateService: SearchStateService,
    private _homeStoreService: HomeStoreService
  ) {}

  ngOnInit(): void {
    // * FIRST SOLUTION
    // this.movie$ = this._searchStateService.movieData$.pipe(
    //   tap(
    //     ({ id }) => (this.movieVideos$ = this._homeStoreService.getVideos(id))
    //   )
    // );

    // * SECOND SOLUTION
    const movie$ = this._searchStateService.movieData$;
    const movieVideos$ = movie$.pipe(
      concatMap(({ id }) => this._homeStoreService.getVideos(id))
    );

    this.movieWithVideos$ = combineLatest([movie$, movieVideos$]).pipe(
      map(([movie, videos]) => ({ ...movie, videos })),
      startWith({
        ...this._homeStoreService.getCurrentMovies()[0],
        videos: [],
      })
    );
  }
}
