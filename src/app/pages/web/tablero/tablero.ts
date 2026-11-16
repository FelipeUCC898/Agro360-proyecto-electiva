import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICONO_ALERTA } from '../../../core/models/alerta';
import { AhorroService } from '../../../core/services/ahorro.service';
import { AlertaService } from '../../../core/services/alerta.service';
import { FincaService } from '../../../core/services/finca.service';
import { LoteService } from '../../../core/services/lote.service';
import { BarChart, GrupoGrafico, SerieGrafico } from '../../../shared/bar-chart/bar-chart';
import { millones } from '../../../shared/formato';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';

@Component({
  selector: 'app-tablero',
  imports: [RouterLink, PageHeader, KpiCard, BarChart],
  templateUrl: './tablero.html',
  styleUrl: './tablero.css'
})
export class Tablero {
  readonly finca = inject(FincaService);
  readonly lotes = inject(LoteService).listar();
  readonly alertas = inject(AlertaService).listar().slice(0, 3);
  readonly ahorros = inject(AhorroService).listar();
  readonly iconos = ICONO_ALERTA;
  readonly millones = millones;

  readonly series: SerieGrafico[] = [
    { nombre: 'Ingresos', color: '#97bc62' },
    { nombre: 'Costos', color: '#2f6f8f' },
    { nombre: 'Utilidad', color: '#2c5f2d' }
  ];

  readonly grupos: GrupoGrafico[] = this.lotes.map((l) => ({
    etiqueta: l.nombre,
    valores: [l.ingresos, l.costos, l.utilidad]
  }));

  readonly ingresos = this.lotes.reduce((s, l) => s + l.ingresos, 0);
  readonly costos = this.lotes.reduce((s, l) => s + l.costos, 0);
  readonly utilidad = this.ingresos - this.costos;
  readonly margen = Math.round((this.utilidad / this.ingresos) * 100);
}
