export type TipoCultivo = 'Tubérculo' | 'Cereal' | 'Hortaliza';

export interface Cultivo {
  id: number;
  nombre: string;
  variedad: string;
  tipo: TipoCultivo;
  cicloDias: number;
  rendimientoKgHa: number;
  lotes: string[]; // ids de lote
  estado: 'Activo' | 'Inactivo';
}

export interface EtapaCiclo {
  loteId: string;
  siembra: string;
  cosecha: string;
  estimada: boolean;
  avance: number; // porcentaje del ciclo
}
