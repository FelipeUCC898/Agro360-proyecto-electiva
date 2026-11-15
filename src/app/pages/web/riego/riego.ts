import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MetodoRiego, ProgramaRiego } from '../../../core/models/riego';
import { AhorroService } from '../../../core/services/ahorro.service';
import { ClimaService } from '../../../core/services/clima.service';
import { FincaService } from '../../../core/services/finca.service';
import { LoteService } from '../../../core/services/lote.service';
import { RiegoService } from '../../../core/services/riego.service';
import { pesos } from '../../../shared/formato';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';
import { StatusPill, TonoPill } from '../../../shared/status-pill/status-pill';

@Component({
  selector: 'app-riego',
  imports: [FormsModule, PageHeader, KpiCard, StatusPill],
  templateUrl: './riego.html',
  styleUrl: './riego.css'
})
export class Riego {
  private readonly servicio = inject(RiegoService);
  private readonly lotesServicio = inject(LoteService);

  readonly finca = inject(FincaService);
  readonly lotes = this.lotesServicio.listar();
  readonly metodos = this.servicio.metodos;
  readonly programa = this.servicio.listarPrograma();
  readonly lluviaManana = inject(ClimaService).lluviaManana();
  readonly ahorroAgua = inject(AhorroService).listar().find((a) => a.recurso === 'Agua')?.porcentaje ?? 0;
  readonly pesos = pesos;

  readonly registros = this.servicio.lista;
  readonly horas = computed(() => this.registros().reduce((s, r) => s + r.horas, 0));
  readonly agua = computed(() => this.registros().reduce((s, r) => s + r.aguaM3, 0));

  // Formulario de nuevo riego
  loteNuevo = 'a';
  fecha = this.servicio.hoy();
  metodo: MetodoRiego = 'Aspersión';
  horasNuevas: number | null = null;
  responsable = 'Mario R.';
  observacion = '';

  nombreLote(id: string): string {
    return this.lotesServicio.obtener(id)?.nombre ?? id;
  }

  tono(p: ProgramaRiego): TonoPill {
    return p.estado === 'Programado' ? 'ok' : p.estado === 'Omitido por lluvia' ? 'info' : 'aviso';
  }

  guardar(): void {
    if (!this.horasNuevas) {
      return;
    }
    this.servicio.agregar({
      fecha: this.fecha,
      loteId: this.loteNuevo,
      metodo: this.metodo,
      horas: this.horasNuevas,
      responsable: this.responsable,
      observacion: this.observacion || undefined
    });
    this.horasNuevas = null;
    this.observacion = '';
  }
}
