export type EstadoFactura = 'Pagada' | 'Por cobrar' | 'Vencida';

export interface Factura {
  numero: string;
  cliente: string;
  lote: string;
  kg: number;
  precioKg: number;
  estado: EstadoFactura;
}

export interface Despacho {
  cosechadoKg: number;
  despachadoKg: number;
  mermaKg: number;
  saldoKg: number;
}
