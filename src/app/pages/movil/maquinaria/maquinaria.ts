import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InventarioService } from '../../../core/services/inventario.service';
import { MaquinariaService } from '../../../core/services/maquinaria.service';
import { pesos } from '../../../shared/formato';
import { MovilHeader } from '../../../shared/movil-header/movil-header';
import { FilaResumen, MovilResumen } from '../../../shared/movil-resumen/movil-resumen';

@Component({
  selector: 'app-movil-maquinaria',
  imports: [FormsModule, MovilHeader, MovilResumen],
  templateUrl: './maquinaria.html'
})
export class MovilMaquinaria {
  private readonly router = inject(Router);
  private readonly servicio = inject(MaquinariaService);
  private readonly inventario = inject(InventarioService);

  readonly equipos = this.servicio.listaEquipos;

  equipoId = 1;
  horas = 3;
  galones: number | null = null;

  readonly equipo = computed(() => this.equipos().find((e) => e.id === Number(this.equipoId)));
  readonly guardado = signal(false);

  // Si no se escribe el combustible, se estima con el consumo del equipo
  get galonesUsados(): number {
    return this.galones ?? Math.round((this.equipo()?.consumoGalH ?? 0) * this.horas * 10) / 10;
  }

  get resumen(): FilaResumen[] {
    const e = this.equipo();
    const acpm = this.inventario.buscarPorNombre('ACPM');
    return [
      { etiqueta: 'Inventario ACPM', valor: '−' + this.galonesUsados.toString().replace('.', ',') + ' gal' + (acpm ? ' (hay ' + acpm.existencia + ')' : '') },
      { etiqueta: 'Horas acumuladas del equipo', valor: ((e?.horasUso ?? 0) + this.horas).toString().replace('.', ',') + ' h' },
      { etiqueta: 'Costo del Lote A', valor: '+' + pesos(Math.round(this.horas * (e?.costoHora ?? 0))) }
    ];
  }

  guardar(): void {
    this.servicio.registrarUso(Number(this.equipoId), 'a', this.horas, this.galonesUsados);
    this.guardado.set(true);
    this.router.navigateByUrl('/movil/registrar');
  }
}
