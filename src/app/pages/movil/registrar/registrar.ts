import { Component } from '@angular/core';
import { MovilHeader } from '../../../shared/movil-header/movil-header';

@Component({
  selector: 'app-movil-registrar',
  imports: [MovilHeader],
  template: '<app-movil-header titulo="¿Qué hiciste hoy?" subtitulo="Finca La Esperanza" />'
})
export class MovilRegistrar {}
