import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-movil-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './movil-layout.html',
  styleUrl: './movil-layout.css'
})
export class MovilLayout {
  private readonly router = inject(Router);

  // Las pantallas de registro (labor, cosecha) cuelgan de la pestaña Registrar
  readonly pestanas = [
    { etiqueta: 'Registrar', icono: 'bi-plus-lg', ruta: '/movil/registrar', activas: ['/movil/registrar', '/movil/labor', '/movil/cosecha'] },
    { etiqueta: 'Mis lotes', icono: 'bi-list', ruta: '/movil/lotes', activas: ['/movil/lotes'] },
    { etiqueta: 'Alertas', icono: 'bi-bell', ruta: '/movil/alertas', activas: ['/movil/alertas'] }
  ];

  activaRuta(rutas: string[]): boolean {
    return rutas.some((r) => this.router.url.startsWith(r));
  }
}
