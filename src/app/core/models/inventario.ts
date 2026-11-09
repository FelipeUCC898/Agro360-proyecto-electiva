export interface Producto {
  id: number;
  nombre: string;
  tipo: string;
  unidad: string;
  existencia: number;
  minimo: number; // 0 si no tiene mínimo
  vence?: string;
  venceEnDias?: number;
}

export interface ResumenInventario {
  productos: number;
  valorBodega: number; // millones de pesos
  porVencer: number;
  bajoMinimo: number;
}
