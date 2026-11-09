import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.html'
})
export class PageHeader {
  titulo = input.required<string>();
  subtitulo = input<string>();
}
