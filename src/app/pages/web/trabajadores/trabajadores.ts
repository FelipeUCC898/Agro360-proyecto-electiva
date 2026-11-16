import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FincaService } from '../../../core/services/finca.service';
import { LoteService } from '../../../core/services/lote.service';
import { TrabajadorService } from '../../../core/services/trabajador.service';
import { millones, pesos } from '../../../shared/formato';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';
import { StatusPill } from '../../../shared/status-pill/status-pill';

@Component({
  selector: 'app-trabajadores',
  imports: [FormsModule, PageHeader, KpiCard, StatusPill],
  templateUrl: './trabajadores.html',
  styleUrl: './trabajadores.css'
})
export class Trabajadores {
  private readonly servicio = inject(TrabajadorService);
  private readonly lotesServicio = inject(LoteService);

  readonly finca = inject(FincaService);
  readonly lotes = this.lotesServicio.listar();
  readonly millones = millones;
  readonly pesos = pesos;

  readonly personal = this.servicio.lista;
  readonly activos = computed(() => this.personal().filter((t) => t.estado === 'Activo').length);
  readonly jornales = computed(() => this.personal().reduce((s, t) => s + t.jornalesMes, 0));
  readonly costo = computed(() => this.personal().reduce((s, t) => s + t.jornalesMes * t.valorJornal, 0) / 1000000);
  readonly promedio = computed(() => Math.round(this.personal().reduce((s, t) => s + t.valorJornal, 0) / (this.personal().length || 1)));

  readonly porLote = computed(() =>
    this.lotes.map((l) => ({ lote: l.nombre, jornales: this.personal().filter((t) => t.loteId === l.id).reduce((s, t) => s + t.jornalesMes, 0) }))
  );
  readonly maxLote = computed(() => Math.max(1, ...this.porLote().map((p) => p.jornales)));

  // Formulario de nuevo trabajador
  nombre = '';
  cargo = '';
  contrato: 'Jornal' | 'Fijo' = 'Jornal';
  valorJornal: number | null = 70000;
  loteNuevo = 'a';

  nombreLote(id?: string): string {
    return this.lotesServicio.obtener(id ?? '')?.nombre ?? 'Sin asignar';
  }

  guardar(): void {
    if (!this.nombre || !this.cargo || !this.valorJornal) {
      return;
    }
    this.servicio.agregar({ nombre: this.nombre, cargo: this.cargo, contrato: this.contrato, valorJornal: this.valorJornal, loteId: this.loteNuevo });
    this.nombre = '';
    this.cargo = '';
  }
}
