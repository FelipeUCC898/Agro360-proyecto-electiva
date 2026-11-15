import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Finca } from '../../../core/models/finca';
import { FincaService } from '../../../core/services/finca.service';
import { LoteService } from '../../../core/services/lote.service';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';
import { PlaceholderBox } from '../../../shared/placeholder-box/placeholder-box';
import { StatusPill } from '../../../shared/status-pill/status-pill';

@Component({
  selector: 'app-fincas',
  imports: [FormsModule, RouterLink, PageHeader, KpiCard, PlaceholderBox, StatusPill],
  templateUrl: './fincas.html',
  styleUrl: './fincas.css'
})
export class Fincas {
  readonly servicio = inject(FincaService);
  private readonly totalLotes = inject(LoteService).listar().length;

  readonly fincas = this.servicio.lista;
  readonly activas = computed(() => this.fincas().filter((f) => f.estado === 'Activa').length);
  readonly hectareas = computed(() => this.fincas().reduce((s, f) => s + f.areaHa, 0));

  // Formulario de nueva finca o de edición
  editandoId: string | null = null;
  nombre = '';
  municipio = '';
  departamento = 'Cundinamarca';
  areaHa: number | null = null;
  responsable = '';

  // Los lotes registrados son los de La Esperanza
  lotesDe(finca: Finca): number {
    return finca.id === 'la-esperanza' ? this.totalLotes : 0;
  }

  abrirNueva(): void {
    this.editandoId = null;
    this.nombre = '';
    this.municipio = '';
    this.departamento = 'Cundinamarca';
    this.areaHa = null;
    this.responsable = '';
  }

  abrirEditar(finca: Finca): void {
    this.editandoId = finca.id;
    this.nombre = finca.nombre;
    this.municipio = finca.municipio;
    this.departamento = finca.departamento;
    this.areaHa = finca.areaHa;
    this.responsable = finca.responsable;
  }

  guardar(): void {
    if (!this.nombre || !this.municipio || !this.areaHa || !this.responsable) {
      return;
    }
    const datos = { nombre: this.nombre, municipio: this.municipio, departamento: this.departamento, areaHa: this.areaHa, responsable: this.responsable };
    if (this.editandoId) {
      const actual = this.fincas().find((f) => f.id === this.editandoId);
      this.servicio.actualizar({ ...datos, id: this.editandoId, estado: actual?.estado ?? 'Activa' });
    } else {
      this.servicio.agregar({ ...datos, estado: 'Activa' });
    }
  }
}
