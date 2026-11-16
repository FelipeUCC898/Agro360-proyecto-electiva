export type EstadoAplicacion = 'Pendiente' | 'Aplicada' | 'Pospuesta por lluvia';

export interface AplicacionFertilizante {
  id: number;
  loteId: string;
  productoId: number; // id del producto en el inventario
  producto: string;
  dosisKgHa: number;
  areaHa: number;
  kgTotal: number;
  fecha: string;
  estado: EstadoAplicacion;
}
