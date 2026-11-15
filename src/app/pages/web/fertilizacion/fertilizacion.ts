import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AplicacionFertilizante, EstadoAplicacion } from '../../../core/models/fertilizacion';
import { ClimaService } from '../../../core/services/clima.service';
import { FertilizacionService } from '../../../core/services/fertilizacion.service';
import { FincaService } from '../../../core/services/finca.service';
import { InventarioService } from '../../../core/services/inventario.service';
import { LoteService } from '../../../core/services/lote.service';
import { ReporteService } from '../../../core/services/reporte.service';
import { kg, millones } from '../../../shared/formato';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';
import { StatusPill, TonoPill } from '../../../shared/status-pill/status-pill';

@Component({
  selector: 'app-fertilizacion',
  imports: [FormsModule, PageHeader, KpiCard, StatusPill],
  templateUrl: './fertilizacion.html',
  styleUrl: './fertilizacion.css'
})
export class Fertilizacion {
  private readonly servicio = inject(FertilizacionService);
  private readonly lotesServicio = inject(LoteService);

  readonly finca = inject(FincaService);
  readonly lotes = this.lotesServicio.listar();
  readonly fertilizantes = inject(InventarioService).listarProductos().filter((p) => p.tipo === 'Fertilizante');
  readonly lluviaManana = inject(ClimaService).lluviaManana();
  readonly kg = kg;
  readonly millones = millones;

  readonly aplicaciones = this.servicio.lista;
  readonly costoCiclo = inject(ReporteService).rubros(['a', 'b', 'c']).find((r) => r.nombre === 'Fertilización')?.valor ?? 0;

  readonly kgAplicados = computed(() => this.aplicaciones().filter((a) => a.estado === 'Aplicada').reduce((s, a) => s + a.kgTotal, 0));
  readonly pendientes = computed(() => this.aplicaciones().filter((a) => a.estado !== 'Aplicada').length);

  // Si va a llover, se sugiere posponer lo que sigue pendiente
  readonly pendientesPorPosponer = computed(() => this.aplicaciones().filter((a) => a.estado === 'Pendiente'));

  mensajeError = '';

  // Formulario de nueva aplicación
  loteNuevo = 'a';
  productoNuevo = this.fertilizantes[0]?.id ?? 1;
  dosis: number | null = null;
  fecha = this.servicio.hoy();

  nombreLote(id: string): string {
    return this.lotesServicio.obtener(id)?.nombre ?? id;
  }

  areaDe(id: string): number {
    return this.lotesServicio.obtener(id)?.areaHa ?? 0;
  }

  totalNuevo(): number {
    return Math.round((this.dosis ?? 0) * this.areaDe(this.loteNuevo));
  }

  tono(estado: EstadoAplicacion): TonoPill {
    return estado === 'Aplicada' ? 'ok' : estado === 'Pendiente' ? 'aviso' : 'info';
  }

  sinStock(a: AplicacionFertilizante): boolean {
    return a.estado !== 'Aplicada' && this.servicio.existencia(a.productoId) < a.kgTotal;
  }

  aplicar(a: AplicacionFertilizante): void {
    this.mensajeError = this.servicio.marcarAplicada(a.id) ? '' : 'No hay existencia suficiente de ' + a.producto + ' en el inventario.';
  }

  reprogramar(a: AplicacionFertilizante): void {
    this.servicio.reprogramar(a.id);
  }

  guardar(): void {
    const producto = this.fertilizantes.find((p) => p.id === Number(this.productoNuevo));
    if (!producto || !this.dosis) {
      return;
    }
    this.servicio.programar({
      loteId: this.loteNuevo,
      productoId: producto.id,
      producto: producto.nombre,
      dosisKgHa: this.dosis,
      areaHa: this.areaDe(this.loteNuevo),
      fecha: this.fecha
    });
    this.dosis = null;
  }
}
