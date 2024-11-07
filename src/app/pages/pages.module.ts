import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { MovieCardComponent } from './home/movie-card/movie-card.component';
import { SharedModule } from '@shared/shared.module';
import { MasterMovieComponent } from './search/master-movie/master-movie.component';
import { DetailMovieComponent } from './search/detail-movie/detail-movie.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    MovieCardComponent,
    MasterMovieComponent,
    DetailMovieComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    CardModule,
    TabViewModule,
    ChipModule,
    ButtonModule,
    InputTextModule,
    DataViewModule,
    TableModule,
    SharedModule,
  ],
})
export class PagesModule {}
