import { Component, OnInit } from '@angular/core';

import { EMPTY, map, Observable } from 'rxjs';

import { type Movie } from '@core/models/movie.model';
import { LoaderStateService } from '@shared/components/loader/loader-state.service';
import { HomeStoreService } from '@store/home-store.service';
import { HomeStateService } from './home-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public topMovies$: Observable<Movie[]> = EMPTY;
  public normalMovies$: Observable<Movie[]> = EMPTY;

  constructor(
    private _homeStoreService: HomeStoreService,
    private _homeStateService: HomeStateService
  ) {}

  ngOnInit(): void {
    this.topMovies$ = this._homeStoreService.filterByRate('TOP');
    this.normalMovies$ = this._homeStoreService.filterByRate('NORMAL');

    //* Set test data to Navbar component
    this._homeStateService.homeDataSubject.next({
      name: 'Alexander Avila',
      role: 'Frontend Developer',
    });
  }
}
