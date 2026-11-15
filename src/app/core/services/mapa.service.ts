import { Injectable } from '@angular/core';
import { MarcadorMapa, PoligonoLote } from '../models/mapa';

// Plano esquemático de la finca, dibujado en un viewBox de 400 x 300
@Injectable({ providedIn: 'root' })
export class MapaService {
  readonly contorno = '10,10 390,10 390,290 10,290';

  private readonly poligonos: PoligonoLote[] = [
    { loteId: 'a', puntos: '20,30 190,24 198,150 28,160' },
    { loteId: 'b', puntos: '206,26 380,34 372,156 214,150' },
    { loteId: 'c', puntos: '28,170 198,164 205,280 36,274' }
  ];

  private readonly marcadores: MarcadorMapa[] = [
    { loteId: 'a', x: 70, y: 62, tipo: 'plaga', titulo: 'Posible gota en Lote A · sector norte' },
    { loteId: 'c', x: 60, y: 200, tipo: 'clima', titulo: 'Lluvia mañana: posponer fertilización' }
  ];

  listarPoligonos(): PoligonoLote[] {
    return this.poligonos;
  }

  listarMarcadores(): MarcadorMapa[] {
    return this.marcadores;
  }

  // Centro aproximado de un polígono, para poner el nombre del lote
  centro(puntos: string): { x: number; y: number } {
    const pares = puntos.split(' ').map((p) => p.split(',').map(Number));
    const x = pares.reduce((s, p) => s + p[0], 0) / pares.length;
    const y = pares.reduce((s, p) => s + p[1], 0) / pares.length;
    return { x, y };
  }
}
