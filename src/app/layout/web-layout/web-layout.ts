import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MENU, MENU_PROXIMAMENTE } from '../../core/menu';
import { FincaService } from '../../core/services/finca.service';

@Component({
  selector: 'app-web-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './web-layout.html',
  styleUrl: './web-layout.css'
})
export class WebLayout {
  readonly menu = MENU;
  readonly proximamente = MENU_PROXIMAMENTE;
  readonly finca = inject(FincaService);
}
