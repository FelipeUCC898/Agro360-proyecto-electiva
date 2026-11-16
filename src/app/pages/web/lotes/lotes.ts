import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Lote } from '../../../core/models/lote';
import { FincaService } from '../../../core/services/finca.service';
import { LoteService } from '../../../core/services/lote.service';
import { pesos } from '../../../shared/formato';
import { PageHeader } from '../../../shared/page-header/page-header';
import { PlaceholderBox } from '../../../shared/placeholder-box/placeholder-box';
import { StatusPill } from '../../../shared/status-pill/status-pill';

@Component({
  selector: 'app-lotes',
  imports: [FormsModule, RouterLink, PageHeader, PlaceholderBox, StatusPill],
  templateUrl: './lotes.html',
  styleUrl: './lotes.css'
})
export class Lotes {
  readonly finca = inject(FincaService);
  readonly pesos = pesos;

  readonly lotes = signal<Lote[]>([...inject(LoteService).listar()]);
  readonly busqueda = signal('');

  readonly filtrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    return this.lotes().filter((l) => (l.nombre + ' ' + l.cultivo).toLowerCase().includes(texto));
  });

  readonly hectareas = computed(() => this.lotes().reduce((s, l) => s + l.areaHa, 0));

  // Formulario del nuevo lote
  nuevoNombre = '';
  nuevoCultivo = '';
  nuevaArea: number | null = null;

  guardarLote(): void {
    if (!this.nuevoNombre || !this.nuevoCultivo || !this.nuevaArea) {
      return;
    }
    const lote: Lote = {
      id: this.nuevoNombre.toLowerCase().replace(/\s+/g, '-'),
      nombre: this.nuevoNombre,
      cultivo: this.nuevoCultivo,
      areaHa: this.nuevaArea,
      estado: 'En producción',
      ciclo: this.finca.ciclo,
      ingresos: 0,
      costos: 0,
      utilidad: 0,
      margen: 0,
      costoKg: 0,
      cosechaKg: 0
    };
    this.lotes.update((lista) => [...lista, lote]);
    this.nuevoNombre = '';
    this.nuevoCultivo = '';
    this.nuevaArea = null;
  }
}
