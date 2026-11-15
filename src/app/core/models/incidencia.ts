export type SeveridadPlaga = 'Baja' | 'Media' | 'Alta';
export type EstadoIncidencia = 'Detectada' | 'En control' | 'Resuelta';

export interface TratamientoPlaga {
  producto: string;
  dosis: string;
  fecha: string;
}

export interface Incidencia {
  id: number;
  fecha: string;
  loteId: string;
  nombre: string;
  tipo: 'Plaga' | 'Enfermedad';
  severidad: SeveridadPlaga;
  sector: string;
  estado: EstadoIncidencia;
  tratamiento?: TratamientoPlaga;
}
