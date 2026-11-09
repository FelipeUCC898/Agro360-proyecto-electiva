import { Injectable } from '@angular/core';

export interface PronosticoDia {
  dia: string;
  lluvia: number; // porcentaje
}

@Injectable({ providedIn: 'root' })
export class ClimaService {
  readonly maxima = 21;
  readonly minima = 9;
  readonly estado = 'Nublado';

  private readonly pronostico: PronosticoDia[] = [
    { dia: 'Mañana', lluvia: 70 },
    { dia: 'Jue', lluvia: 30 },
    { dia: 'Vie', lluvia: 10 }
  ];

  listar(): PronosticoDia[] {
    return this.pronostico;
  }
}
