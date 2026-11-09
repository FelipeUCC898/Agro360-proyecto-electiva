import { Injectable } from '@angular/core';
import { CostoLote, RubroCosto } from '../models/costo';

const COLORES = ['#2c5f2d', '#97bc62', '#2f6f8f', '#b7791f', '#8a5a9e', '#4fa3a5', '#9aa79c'];
const NOMBRES = ['Semilla', 'Fertilización', 'Mano de obra', 'Maquinaria y combustible', 'Control fitosanitario', 'Riego', 'Costos indirectos'];

function rubros(valores: number[]): RubroCosto[] {
  return valores.map((valor, i) => ({ nombre: NOMBRES[i], valor, color: COLORES[i] }));
}

@Injectable({ providedIn: 'root' })
export class CostoService {
  private readonly costos: Record<string, CostoLote> = {
    a: {
      rubros: rubros([5.2, 4.6, 4.1, 2.3, 2.4, 1.3, 1.1]),
      costoKgAnterior: 780,
      labores: [
        { fecha: '14 jul', detalle: 'Riego · 3 h', valor: 38000 },
        { fecha: '12 jul', detalle: 'Fungicida · 2 L', valor: 124000 },
        { fecha: '10 jul', detalle: 'Deshierbe · 6 jornales', valor: 420000 },
        { fecha: '08 jul', detalle: 'Tractor · 4,5 h', valor: 310000 },
        { fecha: '05 jul', detalle: 'Fertilización', valor: 642000 }
      ]
    },
    b: {
      rubros: rubros([2.0, 4.2, 3.4, 2.6, 1.8, 1.0, 0.5]),
      costoKgAnterior: 1050,
      labores: [
        { fecha: '16 jul', detalle: 'Riego · 2 h', valor: 26000 },
        { fecha: '13 jul', detalle: 'Herbicida · 3 L', valor: 96000 },
        { fecha: '09 jul', detalle: 'Deshierbe · 4 jornales', valor: 280000 },
        { fecha: '06 jul', detalle: 'Tractor · 3 h', valor: 207000 },
        { fecha: '02 jul', detalle: 'Fertilización', valor: 515000 }
      ]
    },
    c: {
      rubros: rubros([1.5, 2.8, 4.5, 1.5, 2.2, 1.8, 0.7]),
      costoKgAnterior: 640,
      labores: [
        { fecha: '15 jul', detalle: 'Riego · 4 h', valor: 52000 },
        { fecha: '11 jul', detalle: 'Control de plagas · 1 L', valor: 88000 },
        { fecha: '09 jul', detalle: 'Cosecha manual · 8 jornales', valor: 560000 },
        { fecha: '04 jul', detalle: 'Tractor · 2 h', valor: 138000 },
        { fecha: '01 jul', detalle: 'Fertilización', valor: 390000 }
      ]
    }
  };

  obtener(idLote: string): CostoLote | undefined {
    return this.costos[idLote];
  }
}
