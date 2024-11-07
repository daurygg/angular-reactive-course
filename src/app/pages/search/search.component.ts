import { Component } from '@angular/core';

import { SearchStateService } from './search-state.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [SearchStateService],
})
export class SearchComponent {}
