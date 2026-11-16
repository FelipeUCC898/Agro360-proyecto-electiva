export interface RubroCosto {
  nombre: string;
  valor: number; // millones de pesos
  color: string;
}

export interface LaborReciente {
  fecha: string;
  detalle: string;
  valor: number; // pesos
}

export interface CostoLote {
  rubros: RubroCosto[];
  labores: LaborReciente[];
  costoKgAnterior: number;
}
