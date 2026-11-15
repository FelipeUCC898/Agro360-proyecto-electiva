import { TipoAlerta } from './alerta';

export interface PoligonoLote {
  loteId: string;
  puntos: string; // coordenadas del atributo points del SVG
}

export interface MarcadorMapa {
  loteId: string;
  x: number;
  y: number;
  tipo: TipoAlerta;
  titulo: string;
}
