export interface Finca {
  id: string;
  nombre: string;
  municipio: string;
  departamento: string;
  areaHa: number;
  responsable: string;
  estado: 'Activa' | 'Inactiva';
}
