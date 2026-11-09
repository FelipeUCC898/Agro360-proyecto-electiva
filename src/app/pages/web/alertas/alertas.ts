import { Component, inject, signal } from '@angular/core';
import { ICONO_ALERTA, PrioridadAlerta } from '../../../core/models/alerta';
import { AlertaService } from '../../../core/services/alerta.service';
import { ClimaService } from '../../../core/services/clima.service';
import { PageHeader } from '../../../shared/page-header/page-header';
import { PlaceholderBox } from '../../../shared/placeholder-box/placeholder-box';
import { StatusPill, TonoPill } from '../../../shared/status-pill/status-pill';

@Component({
  selector: 'app-alertas',
  imports: [PageHeader, StatusPill, PlaceholderBox],
  templateUrl: './alertas.html',
  styleUrl: './alertas.css'
})
export class Alertas {
  readonly alertas = inject(AlertaService).listar();
  readonly clima = inject(ClimaService);
  readonly pronostico = this.clima.listar();
  readonly iconos = ICONO_ALERTA;

  // Ids de las alertas marcadas como atendidas
  readonly atendidas = signal<number[]>([]);

  readonly etiquetas: Record<PrioridadAlerta, string> = { urgente: 'Urgente', aviso: 'Aviso', info: 'Info' };
  readonly tonos: Record<PrioridadAlerta, TonoPill> = { urgente: 'peligro', aviso: 'aviso', info: 'neutro' };

  estaAtendida(id: number): boolean {
    return this.atendidas().includes(id);
  }

  marcarAtendida(id: number): void {
    this.atendidas.update((lista) => [...lista, id]);
  }
}
