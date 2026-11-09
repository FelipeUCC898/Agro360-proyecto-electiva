import { Component } from '@angular/core';
import { PageHeader } from '../../../shared/page-header/page-header';

@Component({
  selector: 'app-ventas',
  imports: [PageHeader],
  template: '<app-page-header titulo="Ventas y cartera" subtitulo="Ciclo 2026-A" />'
})
export class Ventas {}
