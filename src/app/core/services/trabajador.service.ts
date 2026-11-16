import { Injectable, signal } from '@angular/core';
import { Trabajador } from '../models/trabajador';

@Injectable({ providedIn: 'root' })
export class TrabajadorService {
  readonly tareas = ['Deshierbe', 'Siembra', 'Cosecha', 'Fertilización', 'Riego'];

  private readonly personal = signal<Trabajador[]>([
    { id: 1, nombre: 'Mario R.', cargo: 'Operario', contrato: 'Jornal', valorJornal: 70000, jornalesMes: 14, loteId: 'a', estado: 'Activo' },
    { id: 2, nombre: 'Luz M.', cargo: 'Operaria', contrato: 'Jornal', valorJornal: 70000, jornalesMes: 12, loteId: 'a', estado: 'Activo' },
    { id: 3, nombre: 'Jorge T.', cargo: 'Tractorista', contrato: 'Fijo', valorJornal: 85000, jornalesMes: 22, loteId: 'b', estado: 'Activo' },
    { id: 4, nombre: 'Ana P.', cargo: 'Operaria', contrato: 'Jornal', valorJornal: 70000, jornalesMes: 9, loteId: 'c', estado: 'Activo' }
  ]);

  readonly lista = this.personal.asReadonly();

  agregar(datos: Omit<Trabajador, 'id' | 'jornalesMes' | 'estado'>): void {
    const id = Math.max(0, ...this.personal().map((t) => t.id)) + 1;
    this.personal.update((lista) => [...lista, { ...datos, id, jornalesMes: 0, estado: 'Activo' }]);
  }

  // Cada trabajador elegido suma un jornal
  registrarJornal(ids: number[]): void {
    this.personal.update((lista) => lista.map((t) => (ids.includes(t.id) ? { ...t, jornalesMes: t.jornalesMes + 1 } : t)));
  }
}
