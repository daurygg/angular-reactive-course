import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { ChipModule } from 'primeng/chip';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { MovieCardComponent } from './home/movie-card/movie-card.component';
import { SharedModule } from "../shared/shared.module";
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [HomeComponent, SearchComponent, MovieCardComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    TabViewModule,
    ChipModule,
    SharedModule,
    ButtonModule
],
})
export class PagesModule {}
