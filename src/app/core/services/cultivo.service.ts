import { Injectable, signal } from '@angular/core';
import { Cultivo, EtapaCiclo } from '../models/cultivo';

@Injectable({ providedIn: 'root' })
export class CultivoService {
  // Los rendimientos salen de los lotes: A 30.000 kg en 5 ha, B 15.000 kg en 4 ha y C 24.000 kg en 3 ha
  private readonly cultivos = signal<Cultivo[]>([
    { id: 1, nombre: 'Papa', variedad: 'Pastusa', tipo: 'Tubérculo', cicloDias: 130, rendimientoKgHa: 6000, lotes: ['a'], estado: 'Activo' },
    { id: 2, nombre: 'Maíz', variedad: 'Amarillo', tipo: 'Cereal', cicloDias: 150, rendimientoKgHa: 3750, lotes: ['b'], estado: 'Activo' },
    { id: 3, nombre: 'Hortalizas', variedad: 'Lechuga batavia', tipo: 'Hortaliza', cicloDias: 75, rendimientoKgHa: 8000, lotes: ['c'], estado: 'Activo' }
  ]);

  readonly lista = this.cultivos.asReadonly();

  private readonly calendario: EtapaCiclo[] = [
    { loteId: 'a', siembra: '12 mar', cosecha: '20 jul', estimada: false, avance: 100 },
    { loteId: 'b', siembra: '20 mar', cosecha: '17 ago', estimada: true, avance: 85 },
    { loteId: 'c', siembra: '1 jun', cosecha: '15 ago', estimada: true, avance: 70 }
  ];

  listarCalendario(): EtapaCiclo[] {
    return this.calendario;
  }

  agregar(datos: Omit<Cultivo, 'id'>): void {
    const id = Math.max(0, ...this.cultivos().map((c) => c.id)) + 1;
    this.cultivos.update((lista) => [...lista, { ...datos, id }]);
  }
}
