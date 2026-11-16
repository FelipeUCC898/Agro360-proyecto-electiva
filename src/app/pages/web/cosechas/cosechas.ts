import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalidadCosecha } from '../../../core/models/cosecha';
import { CosechaService } from '../../../core/services/cosecha.service';
import { FincaService } from '../../../core/services/finca.service';
import { LoteService } from '../../../core/services/lote.service';
import { BarChart, GrupoGrafico, SerieGrafico } from '../../../shared/bar-chart/bar-chart';
import { kg, pesos } from '../../../shared/formato';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';
import { StatusPill } from '../../../shared/status-pill/status-pill';

@Component({
  selector: 'app-cosechas',
  imports: [FormsModule, PageHeader, KpiCard, StatusPill, BarChart],
  templateUrl: './cosechas.html',
  styleUrl: './cosechas.css'
})
export class Cosechas {
  private readonly servicio = inject(CosechaService);

  readonly finca = inject(FincaService);
  readonly lotes = inject(LoteService).listar();
  readonly kg = kg;
  readonly pesos = pesos;
  readonly kgPorSaco = 50;

  readonly filtro = signal('todos');
  readonly registros = this.servicio.lista;
  readonly filas = computed(() => this.registros().filter((c) => this.filtro() === 'todos' || c.loteId === this.filtro()));

  readonly resumen = computed(() => {
    const lista = this.registros();
    const buenos = lista.reduce((s, c) => s + c.kg, 0);
    const merma = lista.reduce((s, c) => s + c.mermaKg, 0);
    const primera = lista.filter((c) => c.calidad === 'Primera').reduce((s, c) => s + c.kg, 0);
    const cosechado = buenos + merma;
    const costos = this.lotes.reduce((s, l) => s + l.costos, 0);
    return {
      cosechado,
      merma: cosechado ? (merma / cosechado) * 100 : 0,
      primera: buenos ? (primera / buenos) * 100 : 0,
      costoKg: cosechado ? Math.round((costos * 1000000) / cosechado) : 0
    };
  });

  // Kilos por lote y calidad, en miles de kg
  readonly serie: SerieGrafico[] = [
    { nombre: 'Primera', color: '#2c5f2d' },
    { nombre: 'Segunda', color: '#97bc62' }
  ];
  readonly grupos = computed<GrupoGrafico[]>(() =>
    this.lotes.map((l) => {
      const delLote = this.registros().filter((c) => c.loteId === l.id);
      const suma = (calidad: CalidadCosecha) => delLote.filter((c) => c.calidad === calidad).reduce((s, c) => s + c.kg, 0);
      return { etiqueta: l.nombre, valores: [suma('Primera') / 1000, suma('Segunda') / 1000] };
    })
  );

  // Formulario de nueva cosecha
  loteNuevo = 'a';
  fecha = this.servicio.hoy();
  calidad: CalidadCosecha = 'Primera';
  sacos: number | null = null;
  mermaKg = 0;
  motivo = '';
  destino = 'Bodega 1';
  responsable = 'Mario R.';

  nombreLote(id: string): string {
    return this.lotes.find((l) => l.id === id)?.nombre ?? id;
  }

  porcentaje(valor: number): string {
    return valor.toFixed(1).replace('.', ',') + ' %';
  }

  guardar(): void {
    if (!this.sacos) {
      return;
    }
    this.servicio.agregar({
      fecha: this.fecha,
      loteId: this.loteNuevo,
      calidad: this.calidad,
      sacos: this.sacos,
      kg: this.sacos * this.kgPorSaco,
      mermaKg: this.mermaKg || 0,
      motivoMerma: this.motivo || undefined,
      destino: this.destino,
      responsable: this.responsable
    });
    this.sacos = null;
    this.mermaKg = 0;
    this.motivo = '';
  }
}
