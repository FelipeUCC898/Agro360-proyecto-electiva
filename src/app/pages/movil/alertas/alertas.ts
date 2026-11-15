import { Component } from '@angular/core';
import { MovilHeader } from '../../../shared/movil-header/movil-header';

@Component({
  selector: 'app-movil-alertas',
  imports: [MovilHeader],
  template: '<app-movil-header titulo="Alertas de hoy" subtitulo="Finca La Esperanza" />'
})
export class MovilAlertas {}
