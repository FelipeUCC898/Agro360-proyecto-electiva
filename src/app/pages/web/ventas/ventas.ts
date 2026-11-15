import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstadoFactura, Factura } from '../../../core/models/venta';
import { FincaService } from '../../../core/services/finca.service';
import { VentaService } from '../../../core/services/venta.service';
import { BarChart, GrupoGrafico, SerieGrafico } from '../../../shared/bar-chart/bar-chart';
import { kg, millones, pesos } from '../../../shared/formato';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';
import { StatusPill, TonoPill } from '../../../shared/status-pill/status-pill';

@Component({
  selector: 'app-ventas',
  imports: [FormsModule, PageHeader, KpiCard, StatusPill, BarChart],
  templateUrl: './ventas.html'
})
export class Ventas {
  private readonly servicio = inject(VentaService);

  readonly finca = inject(FincaService);
  readonly clientes = this.servicio.clientes;
  readonly despacho = this.servicio.despacho;
  readonly millones = millones;
  readonly pesos = pesos;
  readonly kg = kg;

  readonly facturas = signal<Factura[]>([...this.servicio.listarFacturas()]);

  readonly vendido = computed(() => this.suma(() => true));
  readonly cobrado = computed(() => this.suma((f) => f.estado === 'Pagada'));
  readonly porCobrar = computed(() => this.suma((f) => f.estado !== 'Pagada'));
  readonly vencido = computed(() => this.suma((f) => f.estado === 'Vencida'));

  // Cartera pendiente de cada cliente, en millones
  readonly serieCartera: SerieGrafico[] = [{ nombre: 'Por cobrar', color: '#2f6f8f' }];
  readonly gruposCartera = computed<GrupoGrafico[]>(() =>
    this.clientes.map((cliente) => ({
      etiqueta: cliente,
      valores: [Number((this.sumaCliente(cliente) / 1000000).toFixed(1))]
    }))
  );

  readonly tonos: Record<EstadoFactura, TonoPill> = { Pagada: 'ok', 'Por cobrar': 'aviso', Vencida: 'peligro' };

  // Formulario de nueva venta
  clienteNuevo: string | null = null;
  kgNuevo: number | null = null;
  precioNuevo: number | null = null;

  total(f: Factura): number {
    return f.kg * f.precioKg;
  }

  numero(valor: number): string {
    return pesos(valor).slice(1);
  }

  guardarVenta(): void {
    if (!this.clienteNuevo || !this.kgNuevo || !this.precioNuevo) {
      return;
    }
    // La primera factura es la F-0142
    const siguiente = 142 + this.facturas().length;
    const factura: Factura = {
      numero: 'F-0' + siguiente,
      cliente: this.clienteNuevo,
      lote: 'A',
      kg: this.kgNuevo,
      precioKg: this.precioNuevo,
      estado: 'Por cobrar'
    };
    this.facturas.update((lista) => [...lista, factura]);
    this.clienteNuevo = null;
    this.kgNuevo = null;
    this.precioNuevo = null;
  }

  private suma(filtro: (f: Factura) => boolean): number {
    return this.facturas().filter(filtro).reduce((s, f) => s + this.total(f), 0) / 1000000;
  }

  private sumaCliente(cliente: string): number {
    return this.facturas()
      .filter((f) => f.cliente === cliente && f.estado !== 'Pagada')
      .reduce((s, f) => s + this.total(f), 0);
  }
}
