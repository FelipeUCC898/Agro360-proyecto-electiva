import { Injectable } from '@angular/core';

export type EstadoCielo = 'Soleado' | 'Parcial' | 'Nublado' | 'Lluvia';

export interface PronosticoDia {
  dia: string;
  lluvia: number; // porcentaje
  maxima?: number;
  minima?: number;
  estado?: EstadoCielo;
}

export interface LluviaMes {
  mes: string;
  mm: number;
}

export interface Recomendacion {
  icono: string;
  texto: string;
  modulo: string;
  tono: 'aviso' | 'info';
}

export const ICONO_CIELO: Record<EstadoCielo, string> = {
  Soleado: 'bi-sun',
  Parcial: 'bi-cloud-sun',
  Nublado: 'bi-cloudy',
  Lluvia: 'bi-cloud-rain'
};

@Injectable({ providedIn: 'root' })
export class ClimaService {
  readonly maxima = 21;
  readonly minima = 9;
  readonly estado = 'Nublado';
  readonly humedad = 78;

  private readonly pronostico: PronosticoDia[] = [
    { dia: 'Mañana', lluvia: 70, maxima: 19, minima: 9, estado: 'Lluvia' },
    { dia: 'Jue', lluvia: 30, maxima: 21, minima: 8, estado: 'Parcial' },
    { dia: 'Vie', lluvia: 10, maxima: 23, minima: 8, estado: 'Soleado' },
    { dia: 'Sáb', lluvia: 20, maxima: 22, minima: 9, estado: 'Parcial' },
    { dia: 'Dom', lluvia: 40, maxima: 20, minima: 10, estado: 'Nublado' },
    { dia: 'Lun', lluvia: 60, maxima: 19, minima: 10, estado: 'Lluvia' },
    { dia: 'Mar', lluvia: 15, maxima: 22, minima: 9, estado: 'Soleado' }
  ];

  private readonly lluviaMeses: LluviaMes[] = [
    { mes: 'Mar', mm: 85 },
    { mes: 'Abr', mm: 110 },
    { mes: 'May', mm: 95 },
    { mes: 'Jun', mm: 60 },
    { mes: 'Jul', mm: 45 },
    { mes: 'Ago', mm: 70 }
  ];

  listar(): PronosticoDia[] {
    return this.pronostico;
  }

  lluviaPorMes(): LluviaMes[] {
    return this.lluviaMeses;
  }

  lluviaMesActual(): number {
    return this.lluviaMeses[this.lluviaMeses.length - 1].mm;
  }

  // Lluvia esperada para mañana, en porcentaje
  lluviaManana(): number {
    return this.pronostico[0].lluvia;
  }

  // Sugerencias que salen del pronóstico
  recomendaciones(): Recomendacion[] {
    const lluvia = this.lluviaManana();
    if (lluvia >= 60) {
      return [
        { icono: 'bi-flower1', texto: 'Posponer la fertilización del Lote C: lluvia mañana ' + lluvia + ' %.', modulo: 'Fertilización', tono: 'aviso' },
        { icono: 'bi-droplet', texto: 'Omitir el riego del Lote B: humedad suficiente.', modulo: 'Riego', tono: 'info' }
      ];
    }
    return [{ icono: 'bi-droplet', texto: 'Seguir el plan de riego: sin lluvia fuerte esperada.', modulo: 'Riego', tono: 'info' }];
  }
}
