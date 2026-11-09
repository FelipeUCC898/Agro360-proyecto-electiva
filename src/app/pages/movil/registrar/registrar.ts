import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoteService } from '../../../core/services/lote.service';
import { FincaService } from '../../../core/services/finca.service';
import { MovilService } from '../../../core/services/movil.service';
import { MovilHeader } from '../../../shared/movil-header/movil-header';

@Component({
  selector: 'app-movil-registrar',
  imports: [FormsModule, MovilHeader],
  templateUrl: './registrar.html',
  styleUrl: './registrar.css'
})
export class MovilRegistrar {
  private readonly router = inject(Router);

  readonly finca = inject(FincaService);
  readonly lotes = inject(LoteService).listar();
  readonly acciones = inject(MovilService).acciones;

  loteId = 'a';
  readonly seleccionada = signal('fertilizacion');

  continuar(): void {
    const accion = this.acciones.find((a) => a.id === this.seleccionada());
    if (accion?.ruta) {
      this.router.navigateByUrl(accion.ruta);
    }
  }
}
