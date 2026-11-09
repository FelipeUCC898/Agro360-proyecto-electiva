export type TipoAlerta = 'plaga' | 'clima' | 'bodega' | 'riego' | 'maquinaria';
export type PrioridadAlerta = 'urgente' | 'aviso' | 'info';

export interface Alerta {
  id: number;
  tipo: TipoAlerta;
  titulo: string;
  detalle: string;
  prioridad: PrioridadAlerta;
}

export const ICONO_ALERTA: Record<TipoAlerta, string> = {
  plaga: 'bi-bug',
  clima: 'bi-cloud-rain',
  bodega: 'bi-box-seam',
  riego: 'bi-droplet',
  maquinaria: 'bi-truck'
};
