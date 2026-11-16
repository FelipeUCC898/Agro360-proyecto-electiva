import { Injectable, inject, signal } from '@angular/core';
import { AplicacionFertilizante } from '../models/fertilizacion';
import { InventarioService } from './inventario.service';

@Injectable({ providedIn: 'root' })
export class FertilizacionService {
  private readonly inventario = inject(InventarioService);

  private readonly aplicaciones = signal<AplicacionFertilizante[]>([
    { id: 1, loteId: 'a', productoId: 1, producto: 'NPK 10-30-10', dosisKgHa: 120, areaHa: 2.5, kgTotal: 300, fecha: '05 jul', estado: 'Aplicada' },
    { id: 2, loteId: 'b', productoId: 6, producto: 'Urea', dosisKgHa: 80, areaHa: 4, kgTotal: 320, fecha: '18 jul', estado: 'Pendiente' },
    { id: 3, loteId: 'c', productoId: 1, producto: 'NPK 10-30-10', dosisKgHa: 100, areaHa: 3, kgTotal: 300, fecha: '19 jul', estado: 'Pospuesta por lluvia' }
  ]);

  readonly lista = this.aplicaciones.asReadonly();

  hoy(): string {
    return new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }).replace('.', '');
  }

  existencia(productoId: number): number {
    return this.inventario.listarProductos().find((p) => p.id === productoId)?.existencia ?? 0;
  }

  programar(datos: Omit<AplicacionFertilizante, 'id' | 'estado' | 'kgTotal'>): void {
    const id = Math.max(0, ...this.aplicaciones().map((a) => a.id)) + 1;
    const kgTotal = Math.round(datos.dosisKgHa * datos.areaHa);
    this.aplicaciones.update((lista) => [...lista, { ...datos, id, kgTotal, estado: 'Pendiente' }]);
  }

  // Marca la aplicación y descuenta el producto del inventario
  marcarAplicada(id: number): boolean {
    const a = this.aplicaciones().find((x) => x.id === id);
    if (!a || !this.inventario.registrarSalida(a.productoId, a.kgTotal, 'Fertilización Lote ' + a.loteId.toUpperCase())) {
      return false;
    }
    this.aplicaciones.update((lista) => lista.map((x) => (x.id === id ? { ...x, estado: 'Aplicada' } : x)));
    return true;
  }

  reprogramar(id: number): void {
    this.aplicaciones.update((lista) => lista.map((x) => (x.id === id ? { ...x, estado: 'Pendiente', fecha: this.hoy() } : x)));
  }

  // La pantalla móvil de labor registra la aplicación ya hecha
  registrarAplicacion(loteId: string, producto: string, kgTotal: number, areaHa: number): void {
    const inventario = this.inventario.buscarPorNombre(producto);
    if (!inventario) {
      return;
    }
    this.inventario.registrarSalida(inventario.id, kgTotal, 'Fertilización Lote ' + loteId.toUpperCase());
    const id = Math.max(0, ...this.aplicaciones().map((a) => a.id)) + 1;
    this.aplicaciones.update((lista) => [
      ...lista,
      { id, loteId, productoId: inventario.id, producto, dosisKgHa: Math.round(kgTotal / areaHa), areaHa, kgTotal, fecha: this.hoy(), estado: 'Aplicada' }
    ]);
  }
}
