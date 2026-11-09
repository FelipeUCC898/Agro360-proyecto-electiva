import { Component, input } from '@angular/core';

export interface FilaResumen {
  etiqueta: string;
  valor: string;
}

@Component({
  selector: 'app-movil-resumen',
  templateUrl: './movil-resumen.html',
  styleUrl: './movil-resumen.css'
})
export class MovilResumen {
  titulo = input.required<string>();
  filas = input.required<FilaResumen[]>();
}
