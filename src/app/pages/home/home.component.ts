
import { Component, OnInit } from '@angular/core';

import { type Movie } from '@core/models/movie.model';

import { EMPTY, Observable } from 'rxjs';
import { HomeStateService } from './home-state.service';

import { HomeStoreService } from '@store/home-store.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  public topMovies$: Observable<Movie[]> = EMPTY;
  public normalMovies$: Observable<Movie[]> = EMPTY;

  constructor(
     private _homeStateService: HomeStateService,
     private _homeStoreService: HomeStoreService

    ) {}

  ngOnInit(): void {



    this.topMovies$ = this._homeStoreService.filterbyRate('TOP');
    this.normalMovies$ = this._homeStoreService.filterbyRate('Normal');

    this._homeStateService.homeDataSubject$.next({
      name: 'Daury Gomez',
      role: 'Front Developer'
    });
  }
}
