import { Component } from '@angular/core';
import { MovilHeader } from '../../../shared/movil-header/movil-header';

@Component({
  selector: 'app-movil-lotes',
  imports: [MovilHeader],
  template: '<app-movil-header titulo="Mis lotes" subtitulo="Finca La Esperanza" />'
})
export class MovilLotes {}
