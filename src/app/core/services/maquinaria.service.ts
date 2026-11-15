import { Injectable, inject, signal } from '@angular/core';
import { Equipo, UsoEquipo } from '../models/equipo';
import { InventarioService } from './inventario.service';

@Injectable({ providedIn: 'root' })
export class MaquinariaService {
  private readonly inventario = inject(InventarioService);

  private readonly equipos = signal<Equipo[]>([
    { id: 1, nombre: 'Tractor JD 5075', tipo: 'Tractor', horasUso: 1480, horasParaMantenimiento: 20, consumoGalH: 3.2, costoHora: 190000 / 3 },
    { id: 2, nombre: 'Motobomba Honda', tipo: 'Bomba', horasUso: 620, horasParaMantenimiento: 180, consumoGalH: 0.9, costoHora: 18000 },
    { id: 3, nombre: 'Guadaña Stihl', tipo: 'Guadaña', horasUso: 310, horasParaMantenimiento: 40, consumoGalH: 0.4, costoHora: 9000 }
  ]);

  private readonly usos = signal<UsoEquipo[]>([
    { id: 1, fecha: '14 jul', equipoId: 2, loteId: 'a', horas: 3, galones: 2.7 },
    { id: 2, fecha: '10 jul', equipoId: 3, loteId: 'b', horas: 6, galones: 2.4 },
    { id: 3, fecha: '08 jul', equipoId: 1, loteId: 'a', horas: 4.5, galones: 14.4 }
  ]);

  readonly listaEquipos = this.equipos.asReadonly();
  readonly listaUsos = this.usos.asReadonly();

  hoy(): string {
    return new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }).replace('.', '');
  }

  agregarEquipo(datos: Omit<Equipo, 'id'>): void {
    const id = Math.max(0, ...this.equipos().map((e) => e.id)) + 1;
    this.equipos.update((lista) => [...lista, { ...datos, id }]);
  }

  // Suma las horas al equipo y descuenta el ACPM del inventario
  registrarUso(equipoId: number, loteId: string, horas: number, galones: number): void {
    const id = Math.max(0, ...this.usos().map((u) => u.id)) + 1;
    this.usos.update((lista) => [{ id, fecha: this.hoy(), equipoId, loteId, horas, galones }, ...lista]);
    this.equipos.update((lista) =>
      lista.map((e) => (e.id === equipoId ? { ...e, horasUso: e.horasUso + horas, horasParaMantenimiento: Math.max(0, e.horasParaMantenimiento - horas) } : e))
    );
    const acpm = this.inventario.buscarPorNombre('ACPM');
    if (acpm && galones > 0) {
      this.inventario.registrarSalida(acpm.id, galones, 'Combustible de maquinaria');
    }
  }
}
