import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeStateService {
  public homeDataSubject = new Subject<{ name: string; role: string }>();
  public homeData$ = this.homeDataSubject.asObservable();
}
