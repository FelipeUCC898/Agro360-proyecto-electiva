import { Injectable, signal } from '@angular/core';
import { Finca } from '../models/finca';

@Injectable({ providedIn: 'root' })
export class FincaService {
  readonly ciclo = '2026-A';

  private readonly fincas = signal<Finca[]>([
    { id: 'la-esperanza', nombre: 'La Esperanza', municipio: 'Subachoque', departamento: 'Cundinamarca', areaHa: 12, responsable: 'Dueño', estado: 'Activa' },
    { id: 'el-mirador', nombre: 'El Mirador', municipio: 'Zipaquirá', departamento: 'Cundinamarca', areaHa: 8, responsable: 'Administrador', estado: 'Activa' }
  ]);
  private readonly actualId = signal('la-esperanza');

  readonly lista = this.fincas.asReadonly();
  readonly seleccionadaId = this.actualId.asReadonly();

  // Las demás pantallas siguen leyendo nombre y hectareas de la finca actual
  get actual(): Finca {
    return this.fincas().find((f) => f.id === this.actualId()) ?? this.fincas()[0];
  }

  get nombre(): string {
    return 'Finca ' + this.actual.nombre;
  }

  get hectareas(): number {
    return this.actual.areaHa;
  }

  seleccionar(id: string): void {
    this.actualId.set(id);
  }

  agregar(datos: Omit<Finca, 'id'>): void {
    const id = datos.nombre.toLowerCase().trim().replace(/\s+/g, '-');
    this.fincas.update((lista) => [...lista, { ...datos, id }]);
  }

  actualizar(finca: Finca): void {
    this.fincas.update((lista) => lista.map((f) => (f.id === finca.id ? finca : f)));
  }
}
