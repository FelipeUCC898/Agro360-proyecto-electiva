import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MovilService } from '../../../core/services/movil.service';
import { kg, pesos } from '../../../shared/formato';
import { MovilHeader } from '../../../shared/movil-header/movil-header';
import { FilaResumen, MovilResumen } from '../../../shared/movil-resumen/movil-resumen';

@Component({
  selector: 'app-movil-labor',
  imports: [FormsModule, MovilHeader, MovilResumen],
  templateUrl: './labor.html'
})
export class MovilLabor {
  private readonly router = inject(Router);
  private readonly datos = inject(MovilService);

  readonly productos = this.datos.productos;
  readonly kgPorBulto = this.datos.kgPorBulto;

  producto = this.productos[0];
  bultos = 6;
  areaHa = 2.5;
  trabajadores = 'Mario R., Luz M.';
  horas = 3;

  readonly fotoNombre = signal('');

  get jornales(): number {
    return this.trabajadores.split(',').filter((t) => t.trim()).length;
  }

  get costoLote(): number {
    const insumo = this.bultos * this.datos.precioBulto;
    const jornal = this.jornales * this.datos.valorJornal;
    const tractor = this.horas * this.datos.valorHoraTractor;
    return Math.round(insumo + jornal + tractor);
  }

  // Lo que se actualiza al guardar la labor
  get resumen(): FilaResumen[] {
    return [
      { etiqueta: 'Inventario ' + this.producto.split(' ')[0], valor: '−' + kg(this.bultos * this.kgPorBulto) },
      { etiqueta: 'Jornales (' + this.jornales + ')', valor: '+' + pesos(this.jornales * this.datos.valorJornal) },
      { etiqueta: 'Horas de tractor', valor: '+' + this.horas + ' h' },
      { etiqueta: 'Costo del Lote A', valor: '+' + pesos(this.costoLote) }
    ];
  }

  elegirFoto(evento: Event): void {
    const archivo = (evento.target as HTMLInputElement).files?.[0];
    this.fotoNombre.set(archivo ? archivo.name : '');
  }

  guardar(): void {
    this.router.navigateByUrl('/movil/registrar');
  }
}
