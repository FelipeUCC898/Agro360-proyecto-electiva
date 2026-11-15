import { Component } from '@angular/core';
import { PageHeader } from '../../../shared/page-header/page-header';

@Component({
  selector: 'app-alertas',
  imports: [PageHeader],
  template: '<app-page-header titulo="Alertas y clima" subtitulo="Hoy, 19 oct" />'
})
export class Alertas {}
