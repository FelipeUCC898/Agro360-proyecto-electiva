import { Injectable, signal } from '@angular/core';
import { FlujoMes, Movimiento } from '../models/movimiento';

@Injectable({ providedIn: 'root' })
export class FinanzasService {
  readonly meses = ['Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'];
  readonly categoriasIngreso = ['Ventas', 'Otros ingresos'];
  readonly categoriasGasto = ['Semilla', 'Fertilización', 'Mano de obra', 'Maquinaria y combustible', 'Control fitosanitario', 'Riego', 'Costos indirectos', 'Arriendos'];

  // Flujo base del ciclo: suma 76 de ingresos y 51,5 de gastos, igual que el Tablero
  readonly flujoBase: FlujoMes[] = [
    { mes: 'Mar', ingresos: 0, gastos: 12 },
    { mes: 'Abr', ingresos: 0, gastos: 9.5 },
    { mes: 'May', ingresos: 0, gastos: 8 },
    { mes: 'Jun', ingresos: 8, gastos: 7.5 },
    { mes: 'Jul', ingresos: 38, gastos: 9.5 },
    { mes: 'Ago', ingresos: 30, gastos: 5 }
  ];

  // Los movimientos con id mayor a este son los que se registran después
  readonly ultimoBase = 8;

  private readonly movimientos = signal<Movimiento[]>([
    { id: 8, fecha: '25 jul', tipo: 'Ingreso', categoria: 'Ventas', loteId: 'a', descripcion: 'Venta F-0144 Plaza Mayorista', monto: 1620000 },
    { id: 7, fecha: '22 jul', tipo: 'Ingreso', categoria: 'Ventas', loteId: 'a', descripcion: 'Venta F-0143 Rest. El Roble', monto: 8550000 },
    { id: 6, fecha: '20 jul', tipo: 'Ingreso', categoria: 'Ventas', loteId: 'a', descripcion: 'Venta F-0142 Plaza Mayorista', monto: 20700000 },
    { id: 5, fecha: '14 jul', tipo: 'Gasto', categoria: 'Riego', loteId: 'a', descripcion: 'Riego por aspersión, 3 h', monto: 38000 },
    { id: 4, fecha: '12 jul', tipo: 'Gasto', categoria: 'Control fitosanitario', loteId: 'a', descripcion: 'Fungicida X, 2 L', monto: 124000 },
    { id: 3, fecha: '10 jul', tipo: 'Gasto', categoria: 'Mano de obra', loteId: 'a', descripcion: 'Deshierbe, 6 jornales', monto: 420000 },
    { id: 2, fecha: '08 jul', tipo: 'Gasto', categoria: 'Maquinaria y combustible', loteId: 'a', descripcion: 'Tractor, 4,5 h', monto: 310000 },
    { id: 1, fecha: '05 jul', tipo: 'Gasto', categoria: 'Fertilización', loteId: 'a', descripcion: 'Aplicación de NPK 10-30-10', monto: 642000 }
  ]);

  readonly lista = this.movimientos.asReadonly();

  agregar(datos: Omit<Movimiento, 'id'>): void {
    const id = Math.max(0, ...this.movimientos().map((m) => m.id)) + 1;
    this.movimientos.update((lista) => [{ ...datos, id }, ...lista]);
  }

  // Mes abreviado de una fecha como "12 jul", con la primera letra en mayúscula
  mesDe(fecha: string): string {
    const mes = (fecha.split(' ')[1] ?? '').replace('.', '');
    return mes.charAt(0).toUpperCase() + mes.slice(1);
  }
}
