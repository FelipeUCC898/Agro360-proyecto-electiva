import { Component } from '@angular/core';
import { MovilHeader } from '../../../shared/movil-header/movil-header';

@Component({
  selector: 'app-movil-cosecha',
  imports: [MovilHeader],
  template: '<app-movil-header titulo="Registrar cosecha" subtitulo="Lote A · Papa" />'
})
export class MovilCosecha {}
