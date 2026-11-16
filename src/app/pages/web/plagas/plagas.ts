import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstadoIncidencia, Incidencia, SeveridadPlaga } from '../../../core/models/incidencia';
import { FincaService } from '../../../core/services/finca.service';
import { InventarioService } from '../../../core/services/inventario.service';
import { LoteService } from '../../../core/services/lote.service';
import { PlagaService } from '../../../core/services/plaga.service';
import { ReporteService } from '../../../core/services/reporte.service';
import { millones } from '../../../shared/formato';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';
import { StatusPill, TonoPill } from '../../../shared/status-pill/status-pill';

@Component({
  selector: 'app-plagas',
  imports: [FormsModule, PageHeader, KpiCard, StatusPill],
  templateUrl: './plagas.html',
  styleUrl: './plagas.css'
})
export class Plagas {
  private readonly servicio = inject(PlagaService);
  private readonly lotesServicio = inject(LoteService);

  readonly finca = inject(FincaService);
  readonly lotes = this.lotesServicio.listar();
  readonly millones = millones;
  readonly nombres = this.servicio.nombres;
  readonly sectores = this.servicio.sectores;
  readonly severidades: SeveridadPlaga[] = ['Baja', 'Media', 'Alta'];
  readonly fitosanitarios = inject(InventarioService).listarProductos().filter((p) => p.tipo === 'Fitosanitario');
  readonly costoFitosanitario = inject(ReporteService).rubros(['a', 'b', 'c']).find((r) => r.nombre === 'Control fitosanitario')?.valor ?? 0;

  readonly incidencias = this.servicio.lista;
  readonly activas = computed(() => this.incidencias().filter((i) => i.estado !== 'Resuelta'));
  readonly lotesAfectados = computed(() => new Set(this.activas().map((i) => i.loteId)).size);
  readonly aplicaciones = computed(() => this.incidencias().filter((i) => !!i.tratamiento).length);

  readonly seleccionada = signal<number | null>(null);
  readonly detalle = computed(() => this.incidencias().find((i) => i.id === this.seleccionada()));

  mensajeError = '';

  // Formulario de nueva incidencia
  loteNuevo = 'a';
  nombreNuevo = this.nombres[0];
  severidadNueva: SeveridadPlaga = 'Media';
  sectorNuevo = this.sectores[0];

  // Formulario de tratamiento
  productoTrat = this.fitosanitarios[0]?.id ?? 2;
  dosisTrat: number | null = null;
  fechaTrat = this.servicio.hoy();

  nombreLote(id: string): string {
    return this.lotesServicio.obtener(id)?.nombre ?? id;
  }

  tonoSeveridad(s: SeveridadPlaga): TonoPill {
    return s === 'Alta' ? 'peligro' : s === 'Media' ? 'aviso' : 'ok';
  }

  tonoEstado(e: EstadoIncidencia): TonoPill {
    return e === 'Resuelta' ? 'ok' : e === 'En control' ? 'info' : 'peligro';
  }

  elegir(i: Incidencia): void {
    this.seleccionada.set(this.seleccionada() === i.id ? null : i.id);
    this.mensajeError = '';
  }

  reportar(): void {
    this.servicio.reportar(this.loteNuevo, this.nombreNuevo, this.severidadNueva, this.sectorNuevo);
  }

  tratar(): void {
    const id = this.seleccionada();
    if (id === null || !this.dosisTrat) {
      return;
    }
    const hecho = this.servicio.registrarTratamiento(id, Number(this.productoTrat), this.dosisTrat, this.fechaTrat);
    this.mensajeError = hecho ? '' : 'No hay existencia suficiente del producto en el inventario.';
    this.dosisTrat = null;
  }

  resolver(i: Incidencia): void {
    this.servicio.resolver(i.id);
  }
}
