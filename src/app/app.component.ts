import { Component, OnInit } from '@angular/core';

import { LoaderStateService } from '@shared/components/loader/loader-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [LoaderStateService],
})
export class AppComponent implements OnInit {
  constructor(private _loaderStateService: LoaderStateService) {}

  ngOnInit(): void {
    this._loaderStateService.showLoader();
    setTimeout(() => this._loaderStateService.hideLoader(), 5000);
  }
}
