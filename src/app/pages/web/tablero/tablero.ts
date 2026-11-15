import { Component } from '@angular/core';
import { PageHeader } from '../../../shared/page-header/page-header';

@Component({
  selector: 'app-tablero',
  imports: [PageHeader],
  template: '<app-page-header titulo="Tablero de la finca" subtitulo="Finca La Esperanza · Ciclo actual" />'
})
export class Tablero {}
