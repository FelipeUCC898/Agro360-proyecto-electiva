export interface Equipo {
  id: number;
  nombre: string;
  tipo: string;
  horasUso: number;
  horasParaMantenimiento: number;
  consumoGalH: number;
  costoHora: number; // pesos
}

export interface UsoEquipo {
  id: number;
  fecha: string;
  equipoId: number;
  loteId: string;
  horas: number;
  galones: number;
}
