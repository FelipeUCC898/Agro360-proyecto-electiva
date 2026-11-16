import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cultivo, TipoCultivo } from '../../../core/models/cultivo';
import { CultivoService } from '../../../core/services/cultivo.service';
import { LoteService } from '../../../core/services/lote.service';
import { kg } from '../../../shared/formato';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';
import { StatusPill, TonoPill } from '../../../shared/status-pill/status-pill';

@Component({
  selector: 'app-cultivos',
  imports: [FormsModule, PageHeader, KpiCard, StatusPill],
  templateUrl: './cultivos.html',
  styleUrl: './cultivos.css'
})
export class Cultivos {
  private readonly servicio = inject(CultivoService);
  private readonly lotesServicio = inject(LoteService);

  readonly kg = kg;
  readonly tipos: TipoCultivo[] = ['Tubérculo', 'Cereal', 'Hortaliza'];
  readonly cultivos = this.servicio.lista;
  readonly calendario = this.servicio.listarCalendario();

  readonly activos = computed(() => this.cultivos().filter((c) => c.estado === 'Activo').length);
  readonly cicloPromedio = computed(() => Math.round(this.cultivos().reduce((s, c) => s + c.cicloDias, 0) / (this.cultivos().length || 1)));
  readonly rendimientoPromedio = computed(() => Math.round(this.cultivos().reduce((s, c) => s + c.rendimientoKgHa, 0) / (this.cultivos().length || 1)));
  readonly lotesSembrados = computed(() => this.cultivos().reduce((s, c) => s + c.lotes.length, 0));

  // Formulario de nuevo cultivo
  nombre = '';
  variedad = '';
  tipo: TipoCultivo = 'Tubérculo';
  cicloDias: number | null = null;
  rendimiento: number | null = null;

  nombreLote(id: string): string {
    return this.lotesServicio.obtener(id)?.nombre ?? id;
  }

  nombresLotes(c: Cultivo): string {
    return c.lotes.length ? c.lotes.map((id) => this.nombreLote(id)).join(', ') : 'Sin lotes';
  }

  // Rendimiento real del lote en kg por hectárea
  rendimientoReal(c: Cultivo): number | null {
    const lotes = c.lotes.map((id) => this.lotesServicio.obtener(id)).filter((l) => !!l);
    const area = lotes.reduce((s, l) => s + (l?.areaHa ?? 0), 0);
    const cosecha = lotes.reduce((s, l) => s + (l?.cosechaKg ?? 0), 0);
    return area ? Math.round(cosecha / area) : null;
  }

  tonoRendimiento(c: Cultivo): TonoPill {
    const real = this.rendimientoReal(c);
    if (real === null) {
      return 'neutro';
    }
    return real >= c.rendimientoKgHa * 0.95 ? 'ok' : 'aviso';
  }

  cultivoDelLote(loteId: string): string {
    return this.cultivos().find((c) => c.lotes.includes(loteId))?.nombre ?? '—';
  }

  guardar(): void {
    if (!this.nombre || !this.variedad || !this.cicloDias || !this.rendimiento) {
      return;
    }
    this.servicio.agregar({
      nombre: this.nombre,
      variedad: this.variedad,
      tipo: this.tipo,
      cicloDias: this.cicloDias,
      rendimientoKgHa: this.rendimiento,
      lotes: [],
      estado: 'Activo'
    });
    this.nombre = '';
    this.variedad = '';
    this.cicloDias = null;
    this.rendimiento = null;
  }
}
