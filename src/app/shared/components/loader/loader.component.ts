import { Component, Input } from '@angular/core';

import { LoaderStateService } from './loader-state.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  @Input() hasOverlay = false;

  constructor(public loaderStateService: LoaderStateService) {}
}
