import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CostoService } from '../../../core/services/costo.service';
import { LoteService } from '../../../core/services/lote.service';
import { kg, millones, pesos } from '../../../shared/formato';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';

@Component({
  selector: 'app-costo-lote',
  imports: [RouterLink, PageHeader, KpiCard],
  templateUrl: './costo-lote.html',
  styleUrl: './costo-lote.css'
})
export class CostoLote {
  private readonly id = inject(ActivatedRoute).snapshot.paramMap.get('id') ?? '';

  readonly lote = inject(LoteService).obtener(this.id);
  readonly costo = inject(CostoService).obtener(this.id);

  readonly millones = millones;
  readonly pesos = pesos;
  readonly kg = kg;

  // Pestañas del lote: solo Costos tiene pantalla por ahora
  readonly pestanas = ['Labores', 'Cosecha', 'Ventas', 'Historial'];

  porKg(valorMillones: number): number {
    return this.lote ? (valorMillones * 1000000) / this.lote.cosechaKg : 0;
  }

  get totalPesos(): number {
    return this.lote ? this.lote.costos * 1000000 : 0;
  }
}
