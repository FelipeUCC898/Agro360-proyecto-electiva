export type CalidadCosecha = 'Primera' | 'Segunda';

export interface Cosecha {
  id: number;
  fecha: string;
  loteId: string;
  calidad: CalidadCosecha;
  sacos: number;
  kg: number;
  mermaKg: number;
  motivoMerma?: string;
  destino: string;
  responsable: string;
}
