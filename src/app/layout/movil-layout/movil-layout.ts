import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MovilService } from '../../core/services/movil.service';

@Component({
  selector: 'app-movil-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './movil-layout.html',
  styleUrl: './movil-layout.css'
})
export class MovilLayout {
  private readonly router = inject(Router);

  readonly alertas = inject(MovilService).alertas.length;

  // Las pantallas de registro (labor, cosecha) cuelgan de la pestaña Registrar
  readonly pestanas = [
    { etiqueta: 'Registrar', icono: 'bi-plus-circle', iconoActivo: 'bi-plus-circle-fill', ruta: '/movil/registrar', activas: ['/movil/registrar', '/movil/labor', '/movil/cosecha'] },
    { etiqueta: 'Mis lotes', icono: 'bi-grid', iconoActivo: 'bi-grid-fill', ruta: '/movil/lotes', activas: ['/movil/lotes'] },
    { etiqueta: 'Alertas', icono: 'bi-bell', iconoActivo: 'bi-bell-fill', ruta: '/movil/alertas', activas: ['/movil/alertas'], insignia: this.alertas }
  ];

  activaRuta(rutas: string[]): boolean {
    return rutas.some((r) => this.router.url.startsWith(r));
  }
}
