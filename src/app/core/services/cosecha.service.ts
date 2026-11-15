import { Injectable, signal } from '@angular/core';
import { Cosecha } from '../models/cosecha';

@Injectable({ providedIn: 'root' })
export class CosechaService {
  // Los kilos de cada lote suman lo que ya muestra LoteService (A 30.000, B 15.000 y C 24.000)
  private readonly registros = signal<Cosecha[]>([
    { id: 1, fecha: '20 jul', loteId: 'a', calidad: 'Primera', sacos: 360, kg: 18000, mermaKg: 0, destino: 'Bodega 1', responsable: 'Mario R.' },
    { id: 2, fecha: '20 jul', loteId: 'a', calidad: 'Segunda', sacos: 216, kg: 10800, mermaKg: 1200, motivoMerma: 'golpe', destino: 'Bodega 1', responsable: 'Mario R.' },
    { id: 3, fecha: '16 ago', loteId: 'b', calidad: 'Primera', sacos: 240, kg: 12000, mermaKg: 0, destino: 'Bodega 2', responsable: 'Luz M.' },
    { id: 4, fecha: '16 ago', loteId: 'b', calidad: 'Segunda', sacos: 60, kg: 3000, mermaKg: 0, destino: 'Bodega 2', responsable: 'Luz M.' },
    { id: 5, fecha: '15 ago', loteId: 'c', calidad: 'Primera', sacos: 400, kg: 20000, mermaKg: 0, destino: 'Bodega 1', responsable: 'Ana P.' },
    { id: 6, fecha: '15 ago', loteId: 'c', calidad: 'Segunda', sacos: 80, kg: 4000, mermaKg: 0, destino: 'Bodega 1', responsable: 'Ana P.' }
  ]);

  readonly lista = this.registros.asReadonly();

  agregar(datos: Omit<Cosecha, 'id'>): void {
    const id = Math.max(0, ...this.registros().map((c) => c.id)) + 1;
    this.registros.update((lista) => [{ ...datos, id }, ...lista]);
  }

  // Fecha de hoy con el formato de la tabla, por ejemplo "12 jul"
  hoy(): string {
    return new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }).replace('.', '');
  }
}
