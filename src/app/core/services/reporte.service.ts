import { Injectable, inject } from '@angular/core';
import { RubroCosto } from '../models/costo';
import { CostoService } from './costo.service';
import { LoteService } from './lote.service';
import { VentaService } from './venta.service';

export interface FilaReporte {
  id: string;
  lote: string;
  cultivo: string;
  areaHa: number;
  kg: number;
  ingresos: number; // millones de pesos
  costos: number;
  utilidad: number;
  margen: number;
  costoKg: number; // pesos
  retornoHa: number; // millones de pesos por hectárea
}

export interface Comparativo {
  lote: string;
  costoKgAnterior: number;
  costoKgActual: number;
  variacion: number; // porcentaje, negativo = costó menos
}

export interface ResumenCartera {
  vendido: number; // millones de pesos
  cobrado: number;
  porCobrar: number;
  vencido: number;
}

@Injectable({ providedIn: 'root' })
export class ReporteService {
  private readonly lotes = inject(LoteService);
  private readonly costos = inject(CostoService);
  private readonly ventas = inject(VentaService);

  filas(): FilaReporte[] {
    return this.lotes.listar().map((l) => ({
      id: l.id,
      lote: l.nombre,
      cultivo: l.cultivo,
      areaHa: l.areaHa,
      kg: l.cosechaKg,
      ingresos: l.ingresos,
      costos: l.costos,
      utilidad: l.utilidad,
      margen: l.margen,
      costoKg: l.costoKg,
      retornoHa: l.utilidad / l.areaHa
    }));
  }

  comparativo(ids: string[]): Comparativo[] {
    return this.lotes
      .listar()
      .filter((l) => ids.includes(l.id))
      .map((l) => {
        const anterior = this.costos.obtener(l.id)?.costoKgAnterior ?? l.costoKg;
        return {
          lote: l.nombre,
          costoKgAnterior: anterior,
          costoKgActual: l.costoKg,
          variacion: Math.round(((l.costoKg - anterior) / anterior) * 1000) / 10
        };
      });
  }

  // Costo del ciclo sumado por rubro de los lotes elegidos
  rubros(ids: string[]): RubroCosto[] {
    const suma = new Map<string, RubroCosto>();
    for (const id of ids) {
      for (const r of this.costos.obtener(id)?.rubros ?? []) {
        const actual = suma.get(r.nombre);
        suma.set(r.nombre, { ...r, valor: (actual?.valor ?? 0) + r.valor });
      }
    }
    return [...suma.values()];
  }

  cartera(ids: string[]): ResumenCartera {
    const facturas = this.ventas.listarFacturas().filter((f) => ids.includes(f.lote.toLowerCase()));
    const suma = (filtro: (estado: string) => boolean) =>
      facturas.filter((f) => filtro(f.estado)).reduce((s, f) => s + f.kg * f.precioKg, 0) / 1000000;
    return {
      vendido: suma(() => true),
      cobrado: suma((e) => e === 'Pagada'),
      porCobrar: suma((e) => e !== 'Pagada'),
      vencido: suma((e) => e === 'Vencida')
    };
  }
}
