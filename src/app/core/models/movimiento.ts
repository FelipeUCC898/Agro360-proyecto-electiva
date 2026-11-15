export type TipoMovimiento = 'Ingreso' | 'Gasto';

export interface Movimiento {
  id: number;
  fecha: string; // por ejemplo "12 jul"
  tipo: TipoMovimiento;
  categoria: string;
  loteId?: string;
  descripcion: string;
  monto: number; // pesos
}

export interface FlujoMes {
  mes: string;
  ingresos: number; // millones de pesos
  gastos: number;
}
