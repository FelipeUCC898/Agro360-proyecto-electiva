import { Injectable, computed, signal } from '@angular/core';
import { Cliente } from '../models/cliente';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  // Teléfonos de ejemplo, no son reales
  private readonly clientes = signal<Cliente[]>([
    { id: 1, nombre: 'Plaza Mayorista', tipo: 'Mayorista', contacto: 'Carlos P.', telefono: '300 000 0001', ciudad: 'Bogotá' },
    { id: 2, nombre: 'Rest. El Roble', tipo: 'Restaurante', contacto: 'Marta G.', telefono: '300 000 0002', ciudad: 'Chía' },
    { id: 3, nombre: 'Agroandina S.A.', tipo: 'Agroindustria', contacto: 'Julián R.', telefono: '300 000 0003', ciudad: 'Zipaquirá' }
  ]);

  readonly lista = this.clientes.asReadonly();
  readonly nombres = computed(() => this.clientes().map((c) => c.nombre));

  agregar(datos: Omit<Cliente, 'id'>): void {
    const id = Math.max(0, ...this.clientes().map((c) => c.id)) + 1;
    this.clientes.update((lista) => [...lista, { ...datos, id }]);
  }
}
