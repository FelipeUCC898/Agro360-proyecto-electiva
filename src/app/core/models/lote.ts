export interface Lote {
  id: string;
  nombre: string;
  cultivo: string;
  areaHa: number;
  estado: 'Cosechado' | 'En producción';
  ciclo: string;
  ingresos: number; // millones de pesos
  costos: number;
  utilidad: number;
  margen: number; // porcentaje
  costoKg: number; // pesos por kg
  cosechaKg: number;
}
