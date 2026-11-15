import { Component, input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.html'
})
export class KpiCard {
  etiqueta = input.required<string>();
  valor = input.required<string>();
  nota = input<string>();
}
