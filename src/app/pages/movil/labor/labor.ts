import { Component } from '@angular/core';
import { MovilHeader } from '../../../shared/movil-header/movil-header';

@Component({
  selector: 'app-movil-labor',
  imports: [MovilHeader],
  template: '<app-movil-header titulo="Aplicación de abono" subtitulo="Lote A · Fertilización" />'
})
export class MovilLabor {}
