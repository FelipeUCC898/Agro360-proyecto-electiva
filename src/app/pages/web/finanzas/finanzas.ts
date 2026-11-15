import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TipoMovimiento } from '../../../core/models/movimiento';
import { FincaService } from '../../../core/services/finca.service';
import { FinanzasService } from '../../../core/services/finanzas.service';
import { LoteService } from '../../../core/services/lote.service';
import { ReporteService } from '../../../core/services/reporte.service';
import { VentaService } from '../../../core/services/venta.service';
import { BarChart, GrupoGrafico, SerieGrafico } from '../../../shared/bar-chart/bar-chart';
import { millones, pesos } from '../../../shared/formato';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';
import { StatusPill } from '../../../shared/status-pill/status-pill';

@Component({
  selector: 'app-finanzas',
  imports: [FormsModule, PageHeader, KpiCard, StatusPill, BarChart],
  templateUrl: './finanzas.html',
  styleUrl: './finanzas.css'
})
export class Finanzas {
  private readonly servicio = inject(FinanzasService);
  private readonly lotesServicio = inject(LoteService);

  readonly finca = inject(FincaService);
  readonly lotes = this.lotesServicio.listar();
  readonly millones = millones;
  readonly pesos = pesos;
  readonly meses = this.servicio.meses;
  readonly movimientos = this.servicio.lista;

  // Ingresos y gastos base del ciclo, tomados de los lotes
  private readonly ingresosBase = this.lotes.reduce((s, l) => s + l.ingresos, 0);
  private readonly gastosBase = this.lotes.reduce((s, l) => s + l.costos, 0);
  private readonly rubrosBase = inject(ReporteService).rubros(['a', 'b', 'c']);
  readonly porCobrar =
    inject(VentaService).listarFacturas().filter((f) => f.estado !== 'Pagada').reduce((s, f) => s + f.kg * f.precioKg, 0) / 1000000;

  private readonly nuevos = computed(() => this.movimientos().filter((m) => m.id > this.servicio.ultimoBase));
  private readonly suma = (tipo: TipoMovimiento) => this.nuevos().filter((m) => m.tipo === tipo).reduce((s, m) => s + m.monto, 0) / 1000000;

  readonly ingresos = computed(() => this.ingresosBase + this.suma('Ingreso'));
  readonly gastos = computed(() => this.gastosBase + this.suma('Gasto'));
  readonly utilidad = computed(() => this.ingresos() - this.gastos());
  readonly margen = computed(() => (this.ingresos() ? Math.round((this.utilidad() / this.ingresos()) * 100) : 0));

  readonly serie: SerieGrafico[] = [
    { nombre: 'Ingresos', color: '#97bc62' },
    { nombre: 'Gastos', color: '#2f6f8f' }
  ];
  readonly grupos = computed<GrupoGrafico[]>(() =>
    this.servicio.flujoBase.map((f) => {
      const delMes = this.nuevos().filter((m) => this.servicio.mesDe(m.fecha) === f.mes);
      const extra = (tipo: TipoMovimiento) => delMes.filter((m) => m.tipo === tipo).reduce((s, m) => s + m.monto, 0) / 1000000;
      return { etiqueta: f.mes, valores: [Math.round((f.ingresos + extra('Ingreso')) * 10) / 10, Math.round((f.gastos + extra('Gasto')) * 10) / 10] };
    })
  );

  // Gastos por categoría: los rubros del costo más lo que se registre después
  readonly categorias = computed(() => {
    const filas = this.servicio.categoriasGasto.map((nombre) => {
      const base = this.rubrosBase.find((r) => r.nombre === nombre)?.valor ?? 0;
      const extra = this.nuevos().filter((m) => m.tipo === 'Gasto' && m.categoria === nombre).reduce((s, m) => s + m.monto, 0) / 1000000;
      return { nombre, valor: base + extra };
    });
    return filas.filter((f) => f.valor > 0);
  });
  readonly totalCategorias = computed(() => this.categorias().reduce((s, c) => s + c.valor, 0));

  readonly filtro = signal<'todos' | TipoMovimiento>('todos');
  readonly filas = computed(() => this.movimientos().filter((m) => this.filtro() === 'todos' || m.tipo === this.filtro()));

  // Formulario de nuevo movimiento
  tipo: TipoMovimiento = 'Gasto';
  categoria = this.servicio.categoriasGasto[0];
  loteNuevo = 'a';
  mes = 'Ago';
  dia: number | null = 1;
  monto: number | null = null;
  descripcion = '';

  categoriasDelTipo(): string[] {
    return this.tipo === 'Ingreso' ? this.servicio.categoriasIngreso : this.servicio.categoriasGasto;
  }

  cambiarTipo(): void {
    this.categoria = this.categoriasDelTipo()[0];
  }

  nombreLote(id?: string): string {
    return this.lotesServicio.obtener(id ?? '')?.nombre ?? '—';
  }

  porcentaje(valor: number): number {
    return this.totalCategorias() ? (valor / this.totalCategorias()) * 100 : 0;
  }

  guardar(): void {
    if (!this.monto || !this.dia || !this.descripcion) {
      return;
    }
    this.servicio.agregar({
      fecha: this.dia + ' ' + this.mes.toLowerCase(),
      tipo: this.tipo,
      categoria: this.categoria,
      loteId: this.loteNuevo,
      descripcion: this.descripcion,
      monto: this.monto
    });
    this.monto = null;
    this.descripcion = '';
  }
}
