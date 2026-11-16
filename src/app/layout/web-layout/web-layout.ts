import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
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

  constructor() {
    // En el celular el menú se cierra solo al elegir una pantalla
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => this.cerrarMenu());
  }

  private cerrarMenu(): void {
    const panel = document.getElementById('menu-lateral');
    if (panel?.classList.contains('show')) {
      panel.querySelector<HTMLElement>('.btn-close')?.click();
    }
  }
}
