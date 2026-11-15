import { Component, inject } from '@angular/core';
import { BarChart, GrupoGrafico, SerieGrafico } from '../../../shared/bar-chart/bar-chart';
import { ClimaService, ICONO_CIELO } from '../../../core/services/clima.service';
import { FincaService } from '../../../core/services/finca.service';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';
import { StatusPill } from '../../../shared/status-pill/status-pill';

@Component({
  selector: 'app-clima',
  imports: [PageHeader, KpiCard, BarChart, StatusPill],
  templateUrl: './clima.html',
  styleUrl: './clima.css'
})
export class Clima {
  readonly clima = inject(ClimaService);
  readonly finca = inject(FincaService);
  readonly iconos = ICONO_CIELO;

  readonly pronostico = this.clima.listar();
  readonly recomendaciones = this.clima.recomendaciones();

  readonly serie: SerieGrafico[] = [{ nombre: 'Lluvia (mm)', color: '#2f6f8f' }];
  readonly grupos: GrupoGrafico[] = this.clima.lluviaPorMes().map((m) => ({ etiqueta: m.mes, valores: [m.mm] }));
}
