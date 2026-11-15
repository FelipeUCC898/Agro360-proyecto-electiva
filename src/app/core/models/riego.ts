export type MetodoRiego = 'Aspersión' | 'Goteo' | 'Gravedad';

export interface Riego {
  id: number;
  fecha: string;
  loteId: string;
  metodo: MetodoRiego;
  horas: number;
  aguaM3: number;
  costo: number; // pesos
  responsable: string;
  observacion?: string;
}

export interface ProgramaRiego {
  loteId: string;
  metodo: MetodoRiego;
  frecuencia: string;
  proximo: string;
  estado: 'Programado' | 'Omitido por lluvia' | 'Omitido por humedad';
}
