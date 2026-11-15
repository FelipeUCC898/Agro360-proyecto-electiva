import { Component, input } from '@angular/core';

@Component({
  selector: 'app-movil-header',
  templateUrl: './movil-header.html'
})
export class MovilHeader {
  titulo = input.required<string>();
  subtitulo = input<string>();
}
