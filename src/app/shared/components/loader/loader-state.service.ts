import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderStateService {
  private _loaderSubject = new BehaviorSubject<boolean>(false);
  public loader$ = this._loaderSubject.asObservable();

  public showLoader(): void {
    this._loaderSubject.next(true);
  }

  public hideLoader(): void {
    this._loaderSubject.next(false);
  }
}
