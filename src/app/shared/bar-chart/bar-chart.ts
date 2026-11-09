import { Component, computed, input } from '@angular/core';

export interface SerieGrafico {
  nombre: string;
  color: string;
}

export interface GrupoGrafico {
  etiqueta: string;
  valores: number[];
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css'
})
export class BarChart {
  series = input.required<SerieGrafico[]>();
  grupos = input.required<GrupoGrafico[]>();
  maximo = input<number>(40);
  alto = input<number>(230);

  // Líneas de referencia del eje
  readonly marcas = computed(() => {
    const paso = this.maximo() / 4;
    return [0, 1, 2, 3, 4].map((i) => i * paso);
  });

  porcentaje(valor: number): number {
    return (valor / this.maximo()) * 100;
  }
}
