export type TipoCliente = 'Mayorista' | 'Restaurante' | 'Agroindustria';

export interface Cliente {
  id: number;
  nombre: string;
  tipo: TipoCliente;
  contacto: string;
  telefono: string;
  ciudad: string;
}
