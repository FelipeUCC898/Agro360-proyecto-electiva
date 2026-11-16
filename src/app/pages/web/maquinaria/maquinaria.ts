import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Equipo } from '../../../core/models/equipo';
import { FincaService } from '../../../core/services/finca.service';
import { LoteService } from '../../../core/services/lote.service';
import { MaquinariaService } from '../../../core/services/maquinaria.service';
import { pesos } from '../../../shared/formato';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';
import { StatusPill, TonoPill } from '../../../shared/status-pill/status-pill';

@Component({
  selector: 'app-maquinaria',
  imports: [FormsModule, PageHeader, KpiCard, StatusPill],
  templateUrl: './maquinaria.html',
  styleUrl: './maquinaria.css'
})
export class Maquinaria {
  private readonly servicio = inject(MaquinariaService);
  private readonly lotesServicio = inject(LoteService);

  readonly finca = inject(FincaService);
  readonly pesos = pesos;

  readonly equipos = this.servicio.listaEquipos;
  readonly usos = this.servicio.listaUsos;

  readonly horasMes = computed(() => this.usos().reduce((s, u) => s + u.horas, 0));
  readonly combustible = computed(() => this.usos().reduce((s, u) => s + u.galones, 0));
  readonly costoPromedio = computed(() => Math.round(this.equipos().reduce((s, e) => s + e.costoHora, 0) / (this.equipos().length || 1)));

  // Mantenimientos ordenados por las horas que faltan
  readonly mantenimientos = computed(() => [...this.equipos()].sort((a, b) => a.horasParaMantenimiento - b.horasParaMantenimiento));

  // El equipo que más cuesta por hora frente al promedio
  readonly masCostoso = computed(() => [...this.equipos()].sort((a, b) => b.costoHora - a.costoHora)[0]);
  readonly veces = computed(() => {
    const e = this.masCostoso();
    return e && this.costoPromedio() ? (e.costoHora / this.costoPromedio()).toFixed(1).replace('.', ',') : '0';
  });

  // Formulario de nuevo equipo
  nombre = '';
  tipo = '';
  horasUso: number | null = 0;
  horasMant: number | null = null;
  consumo: number | null = null;
  costoHora: number | null = null;

  nombreEquipo(id: number): string {
    return this.equipos().find((e) => e.id === id)?.nombre ?? '—';
  }

  nombreLote(id: string): string {
    return this.lotesServicio.obtener(id)?.nombre ?? id;
  }

  estado(e: Equipo): { texto: string; tono: TonoPill } {
    if (e.horasParaMantenimiento === 0) {
      return { texto: 'Mantenimiento vencido', tono: 'peligro' };
    }
    return e.horasParaMantenimiento <= 20 ? { texto: 'Mantenimiento próximo', tono: 'aviso' } : { texto: 'Operativo', tono: 'ok' };
  }

  numero(valor: number): string {
    return valor.toString().replace('.', ',');
  }

  guardar(): void {
    if (!this.nombre || !this.tipo || !this.horasMant || !this.consumo || !this.costoHora) {
      return;
    }
    this.servicio.agregarEquipo({
      nombre: this.nombre,
      tipo: this.tipo,
      horasUso: this.horasUso ?? 0,
      horasParaMantenimiento: this.horasMant,
      consumoGalH: this.consumo,
      costoHora: this.costoHora
    });
    this.nombre = '';
    this.tipo = '';
    this.horasMant = null;
    this.consumo = null;
    this.costoHora = null;
  }
}
