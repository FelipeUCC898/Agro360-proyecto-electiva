import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../../core/models/inventario';
import { InventarioService } from '../../../core/services/inventario.service';
import { millones, pesos } from '../../../shared/formato';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';
import { StatusPill, TonoPill } from '../../../shared/status-pill/status-pill';

@Component({
  selector: 'app-inventario',
  imports: [FormsModule, PageHeader, KpiCard, StatusPill],
  templateUrl: './inventario.html'
})
export class Inventario {
  private readonly servicio = inject(InventarioService);

  readonly resumen = this.servicio.resumen;
  readonly millones = millones;

  readonly productos = signal<Producto[]>(this.servicio.listarProductos().map((p) => ({ ...p })));
  readonly movimientos = signal<string[]>([...this.servicio.listarMovimientos()]);

  // Formulario de entrada y salida
  tipoMovimiento: 'Entrada' | 'Salida' = 'Entrada';
  idProducto: number | null = null;
  cantidad: number | null = null;

  cantidadTexto(valor: number, unidad: string): string {
    return pesos(valor).slice(1) + ' ' + unidad;
  }

  vence(p: Producto): string {
    if (p.venceEnDias) {
      return 'en ' + p.venceEnDias + ' días';
    }
    return p.vence ?? '—';
  }

  estado(p: Producto): { texto: string; tono: TonoPill } {
    if (p.existencia === 0) {
      return { texto: 'Agotado', tono: 'peligro' };
    }
    if (p.venceEnDias && p.venceEnDias <= 30) {
      return { texto: 'Por vencer', tono: 'aviso' };
    }
    if (p.minimo > 0 && p.existencia < p.minimo) {
      return { texto: 'Bajo mínimo', tono: 'aviso' };
    }
    return { texto: 'OK', tono: 'ok' };
  }

  guardarMovimiento(): void {
    const producto = this.productos().find((p) => p.id === Number(this.idProducto));
    if (!producto || !this.cantidad || this.cantidad <= 0) {
      return;
    }
    const cambio = this.tipoMovimiento === 'Entrada' ? this.cantidad : -Math.min(this.cantidad, producto.existencia);
    this.productos.update((lista) =>
      lista.map((p) => (p.id === producto.id ? { ...p, existencia: p.existencia + cambio } : p))
    );

    const fecha = new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }).replace('.', '');
    const signo = cambio >= 0 ? '+' : '−';
    this.movimientos.update((lista) => [
      `${fecha} · ${this.tipoMovimiento} · ${producto.nombre} ${signo}${this.cantidadTexto(Math.abs(cambio), producto.unidad)}`,
      ...lista
    ]);
    this.idProducto = null;
    this.cantidad = null;
  }
}
