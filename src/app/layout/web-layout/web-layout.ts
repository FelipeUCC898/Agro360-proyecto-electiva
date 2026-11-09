import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MENU } from '../../core/menu';

@Component({
  selector: 'app-web-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './web-layout.html',
  styleUrl: './web-layout.css'
})
export class WebLayout {
  readonly menu = MENU;
}
