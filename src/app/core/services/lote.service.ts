import { Injectable } from '@angular/core';
import { Lote } from '../models/lote';

@Injectable({ providedIn: 'root' })
export class LoteService {
  private readonly lotes: Lote[] = [
    { id: 'a', nombre: 'Lote A', cultivo: 'Papa pastusa', areaHa: 5, estado: 'Cosechado', ciclo: '2026-A', ingresos: 32, costos: 21, utilidad: 11, margen: 34, costoKg: 700, cosechaKg: 30000 },
    { id: 'b', nombre: 'Lote B', cultivo: 'Maíz', areaHa: 4, estado: 'En producción', ciclo: '2026-A', ingresos: 18, costos: 15.5, utilidad: 2.5, margen: 14, costoKg: 1033, cosechaKg: 15000 },
    { id: 'c', nombre: 'Lote C', cultivo: 'Hortalizas', areaHa: 3, estado: 'En producción', ciclo: '2026-A', ingresos: 26, costos: 15, utilidad: 11, margen: 42, costoKg: 625, cosechaKg: 24000 }
  ];

  listar(): Lote[] {
    return this.lotes;
  }

  obtener(id: string): Lote | undefined {
    return this.lotes.find((l) => l.id === id);
  }
}
