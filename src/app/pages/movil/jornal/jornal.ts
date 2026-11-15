import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MovilService } from '../../../core/services/movil.service';
import { TrabajadorService } from '../../../core/services/trabajador.service';
import { pesos } from '../../../shared/formato';
import { MovilHeader } from '../../../shared/movil-header/movil-header';
import { FilaResumen, MovilResumen } from '../../../shared/movil-resumen/movil-resumen';

@Component({
  selector: 'app-movil-jornal',
  imports: [FormsModule, MovilHeader, MovilResumen],
  templateUrl: './jornal.html'
})
export class MovilJornal {
  private readonly router = inject(Router);
  private readonly servicio = inject(TrabajadorService);
  private readonly datos = inject(MovilService);

  readonly personal = this.servicio.lista;
  readonly tareas = this.servicio.tareas;

  // Mario y Luz vienen marcados, como en la labor de ejemplo
  readonly elegidos = signal<number[]>([1, 2]);
  tarea = 'Deshierbe';

  readonly jornales = computed(() => this.elegidos().length);

  get resumen(): FilaResumen[] {
    const costo = this.jornales() * this.datos.valorJornal;
    return [
      { etiqueta: 'Jornales (' + this.jornales() + ')', valor: '+' + pesos(costo) },
      { etiqueta: 'Costo del Lote A', valor: '+' + pesos(costo) }
    ];
  }

  alternar(id: number): void {
    this.elegidos.update((lista) => (lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id]));
  }

  guardar(): void {
    this.servicio.registrarJornal(this.elegidos());
    this.router.navigateByUrl('/movil/registrar');
  }
}
