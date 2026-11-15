import { Component } from '@angular/core';
import { PageHeader } from '../../../shared/page-header/page-header';

@Component({
  selector: 'app-lotes',
  imports: [PageHeader],
  template: '<app-page-header titulo="Lotes" subtitulo="Finca La Esperanza · 3 lotes · 12 ha" />'
})
export class Lotes {}
