import { Component, input } from '@angular/core';

export type TonoKpi = 'verde' | 'azul' | 'ambar' | 'rojo';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css'
})
export class KpiCard {
  etiqueta = input.required<string>();
  valor = input.required<string>();
  nota = input<string>();
  icono = input<string>('');
  tono = input<TonoKpi>('verde');
}
