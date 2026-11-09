import { Component, input } from '@angular/core';

export type TonoPill = 'ok' | 'aviso' | 'peligro' | 'neutro' | 'info';

@Component({
  selector: 'app-status-pill',
  templateUrl: './status-pill.html'
})
export class StatusPill {
  texto = input.required<string>();
  tono = input<TonoPill>('neutro');
}
