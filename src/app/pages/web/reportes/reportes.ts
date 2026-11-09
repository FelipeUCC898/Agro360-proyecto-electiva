import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FincaService } from '../../../core/services/finca.service';
import { FilaReporte, ReporteService } from '../../../core/services/reporte.service';
import { kg, millones, pesos } from '../../../shared/formato';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';
import { StatusPill } from '../../../shared/status-pill/status-pill';

@Component({
  selector: 'app-reportes',
  imports: [FormsModule, PageHeader, KpiCard, StatusPill],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class Reportes {
  private readonly servicio = inject(ReporteService);

  readonly finca = inject(FincaService);
  readonly millones = millones;
  readonly pesos = pesos;
  readonly kg = kg;

  readonly todas = this.servicio.filas();
  readonly filtro = signal('todos');

  readonly filas = computed(() => this.todas.filter((f) => this.filtro() === 'todos' || f.id === this.filtro()));
  private readonly ids = computed(() => this.filas().map((f) => f.id));

  readonly totales = computed(() => {
    const filas = this.filas();
    const suma = (campo: keyof FilaReporte) => filas.reduce((s, f) => s + (f[campo] as number), 0);
    const ingresos = suma('ingresos');
    const utilidad = suma('utilidad');
    const area = suma('areaHa');
    const kilos = suma('kg');
    const costos = suma('costos');
    return {
      ingresos,
      costos,
      utilidad,
      area,
      kg: kilos,
      margen: ingresos ? Math.round((utilidad / ingresos) * 100) : 0,
      costoKg: kilos ? Math.round((costos * 1000000) / kilos) : 0,
      retornoHa: area ? utilidad / area : 0
    };
  });

  readonly comparativo = computed(() => this.servicio.comparativo(this.ids()));
  readonly rubros = computed(() => this.servicio.rubros(this.ids()));
  readonly totalRubros = computed(() => this.rubros().reduce((s, r) => s + r.valor, 0));
  readonly cartera = computed(() => this.servicio.cartera(this.ids()));

  porcentaje(parte: number, total: number): number {
    return total ? (parte / total) * 100 : 0;
  }

  // Descarga la tabla como CSV para abrirla en Excel
  exportar(): void {
    const filas = this.filas();
    const encabezado = ['Lote', 'Cultivo', 'Hectáreas', 'Kg cosechados', 'Ingresos (M)', 'Costos (M)', 'Utilidad (M)', 'Margen (%)', 'Costo por kg', 'Retorno por ha (M)'];
    const lineas = filas.map((f) =>
      [f.lote, f.cultivo, f.areaHa, f.kg, f.ingresos, f.costos, f.utilidad, f.margen, f.costoKg, f.retornoHa.toFixed(2)].join(';')
    );
    const contenido = '﻿' + [encabezado.join(';'), ...lineas].join('\n');
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(new Blob([contenido], { type: 'text/csv;charset=utf-8' }));
    enlace.download = 'reporte-agro360-' + this.finca.ciclo + '.csv';
    enlace.click();
    URL.revokeObjectURL(enlace.href);
  }
}
