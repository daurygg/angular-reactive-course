import { Component } from '@angular/core';

import { HomeStateService } from '@pages/home/home-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: `.sh-thumb {
    width: 28px;
    height: 28px;
    object-fit: cover;
  }`,
})
export class NavbarComponent {
  constructor(public homeStateService: HomeStateService) {}
}
