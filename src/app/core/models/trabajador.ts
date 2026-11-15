export interface Trabajador {
  id: number;
  nombre: string;
  cargo: string;
  contrato: 'Jornal' | 'Fijo';
  valorJornal: number; // pesos
  jornalesMes: number;
  loteId?: string;
  estado: 'Activo' | 'Inactivo';
}
