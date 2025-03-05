import { Component } from '@angular/core';
import { HomeStateService } from '@pages/home/home-state.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: `.sh-thumb {
    width: 28px;
    height: 28px;
    object-fit: cover;
  }`,
})
export class SidebarComponent {
  constructor(public homeStateService:HomeStateService){}
}
