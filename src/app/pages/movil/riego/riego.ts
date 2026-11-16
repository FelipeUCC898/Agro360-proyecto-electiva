import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MetodoRiego } from '../../../core/models/riego';
import { RiegoService } from '../../../core/services/riego.service';
import { pesos } from '../../../shared/formato';
import { MovilHeader } from '../../../shared/movil-header/movil-header';
import { FilaResumen, MovilResumen } from '../../../shared/movil-resumen/movil-resumen';

@Component({
  selector: 'app-movil-riego',
  imports: [FormsModule, MovilHeader, MovilResumen],
  templateUrl: './riego.html'
})
export class MovilRiego {
  private readonly router = inject(Router);
  private readonly servicio = inject(RiegoService);

  readonly metodos = this.servicio.metodos;

  metodo: MetodoRiego = 'Aspersión';
  horas = 3;
  observacion = '';

  // Lo que se actualiza al guardar el riego
  get resumen(): FilaResumen[] {
    return [
      { etiqueta: 'Agua estimada', valor: '+' + this.horas * this.servicio.m3PorHora + ' m³' },
      { etiqueta: 'Horas de riego', valor: '+' + this.horas + ' h' },
      { etiqueta: 'Costo del Lote A', valor: '+' + pesos(this.horas * this.servicio.costoHora) }
    ];
  }

  guardar(): void {
    this.servicio.agregar({
      fecha: this.servicio.hoy(),
      loteId: 'a',
      metodo: this.metodo,
      horas: this.horas,
      responsable: 'Mario R.',
      observacion: this.observacion || undefined
    });
    this.router.navigateByUrl('/movil/registrar');
  }
}
