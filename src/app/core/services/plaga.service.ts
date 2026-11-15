import { Injectable, inject, signal } from '@angular/core';
import { Incidencia, SeveridadPlaga } from '../models/incidencia';
import { AlertaService } from './alerta.service';
import { InventarioService } from './inventario.service';

@Injectable({ providedIn: 'root' })
export class PlagaService {
  private readonly alertas = inject(AlertaService);
  private readonly inventario = inject(InventarioService);

  readonly nombres = ['Gota (Phytophthora)', 'Pulgón', 'Mosca blanca', 'Gusano trozador', 'Otra'];
  readonly sectores = ['Norte', 'Sur', 'Este', 'Oeste'];

  // La gota del Lote A ya tiene su alerta en AlertaService
  private readonly incidencias = signal<Incidencia[]>([
    { id: 1, fecha: 'Hoy', loteId: 'a', nombre: 'Gota (Phytophthora)', tipo: 'Enfermedad', severidad: 'Alta', sector: 'Norte', estado: 'Detectada' },
    { id: 2, fecha: '12 jul', loteId: 'a', nombre: 'Pulgón', tipo: 'Plaga', severidad: 'Media', sector: 'Sur', estado: 'Resuelta', tratamiento: { producto: 'Fungicida X', dosis: '2 L', fecha: '12 jul' } },
    { id: 3, fecha: '10 jul', loteId: 'c', nombre: 'Mosca blanca', tipo: 'Plaga', severidad: 'Baja', sector: 'Este', estado: 'En control', tratamiento: { producto: 'Fungicida X', dosis: '1 L', fecha: '11 jul' } }
  ]);

  readonly lista = this.incidencias.asReadonly();

  hoy(): string {
    return new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }).replace('.', '');
  }

  reportar(loteId: string, nombre: string, severidad: SeveridadPlaga, sector: string): void {
    const id = Math.max(0, ...this.incidencias().map((i) => i.id)) + 1;
    const tipo = nombre.startsWith('Gota') ? 'Enfermedad' : 'Plaga';
    this.incidencias.update((lista) => [{ id, fecha: 'Hoy', loteId, nombre, tipo, severidad, sector, estado: 'Detectada' }, ...lista]);
    // Una incidencia grave se ve como alerta urgente
    if (severidad === 'Alta') {
      this.alertas.agregar({
        tipo: 'plaga',
        titulo: 'Posible ' + nombre + ' en Lote ' + loteId.toUpperCase(),
        detalle: 'Sector ' + sector.toLowerCase() + ' · revisar hoy',
        prioridad: 'urgente'
      });
    }
  }

  // Registra el tratamiento y descuenta el producto del inventario
  registrarTratamiento(id: number, productoId: number, dosis: number, fecha: string): boolean {
    const producto = this.inventario.listarProductos().find((p) => p.id === productoId);
    if (!producto || !this.inventario.registrarSalida(productoId, dosis, 'Control de plagas')) {
      return false;
    }
    this.incidencias.update((lista) =>
      lista.map((i) => (i.id === id ? { ...i, estado: 'En control', tratamiento: { producto: producto.nombre, dosis: dosis + ' ' + producto.unidad, fecha } } : i))
    );
    return true;
  }

  resolver(id: number): void {
    this.incidencias.update((lista) => lista.map((i) => (i.id === id ? { ...i, estado: 'Resuelta' } : i)));
  }
}
