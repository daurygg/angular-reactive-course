import { Component } from '@angular/core';
import { LoaderStateService } from '../services/loader-state.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',

})
export class LoaderComponent {

constructor(public loaderStateService: LoaderStateService) {}
}
