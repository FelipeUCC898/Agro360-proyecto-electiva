import { Injectable, signal } from '@angular/core';
import { MetodoRiego, ProgramaRiego, Riego } from '../models/riego';

@Injectable({ providedIn: 'root' })
export class RiegoService {
  // Valores de ejemplo: caudal de 5 L/s, es decir, 18 m³ por hora
  readonly m3PorHora = 18;
  readonly costoHora = 13000;
  readonly metodos: MetodoRiego[] = ['Aspersión', 'Goteo', 'Gravedad'];

  // Los tres riegos coinciden con las labores de CostoService
  private readonly registros = signal<Riego[]>([
    { id: 1, fecha: '14 jul', loteId: 'a', metodo: 'Aspersión', horas: 3, aguaM3: 54, costo: 38000, responsable: 'Mario R.' },
    { id: 2, fecha: '16 jul', loteId: 'b', metodo: 'Aspersión', horas: 2, aguaM3: 36, costo: 26000, responsable: 'Luz M.' },
    { id: 3, fecha: '15 jul', loteId: 'c', metodo: 'Goteo', horas: 4, aguaM3: 72, costo: 52000, responsable: 'Mario R.' }
  ]);

  readonly lista = this.registros.asReadonly();

  private readonly programa: ProgramaRiego[] = [
    { loteId: 'a', metodo: 'Aspersión', frecuencia: 'Cada 3 días', proximo: 'Mañana', estado: 'Programado' },
    { loteId: 'b', metodo: 'Aspersión', frecuencia: 'Cada 3 días', proximo: 'Omitido hoy', estado: 'Omitido por humedad' },
    { loteId: 'c', metodo: 'Goteo', frecuencia: 'Cada 2 días', proximo: 'Pospuesto', estado: 'Omitido por lluvia' }
  ];

  listarPrograma(): ProgramaRiego[] {
    return this.programa;
  }

  hoy(): string {
    return new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }).replace('.', '');
  }

  agregar(datos: Pick<Riego, 'fecha' | 'loteId' | 'metodo' | 'horas' | 'responsable' | 'observacion'>): void {
    const id = Math.max(0, ...this.registros().map((r) => r.id)) + 1;
    const riego: Riego = { ...datos, id, aguaM3: datos.horas * this.m3PorHora, costo: datos.horas * this.costoHora };
    this.registros.update((lista) => [riego, ...lista]);
  }
}
