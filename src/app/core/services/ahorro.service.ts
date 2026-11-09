import { Injectable } from '@angular/core';

export interface AhorroRecurso {
  recurso: string;
  porcentaje: number;
}

@Injectable({ providedIn: 'root' })
export class AhorroService {
  private readonly ahorros: AhorroRecurso[] = [
    { recurso: 'Agua', porcentaje: 20 },
    { recurso: 'Fertilizantes', porcentaje: 15 },
    { recurso: 'Combustible', porcentaje: 12 },
    { recurso: 'Maquinaria', porcentaje: 18 },
    { recurso: 'Mano de obra', porcentaje: 10 }
  ];

  listar(): AhorroRecurso[] {
    return this.ahorros;
  }
}
