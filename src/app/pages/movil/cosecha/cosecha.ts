import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CosechaService } from '../../../core/services/cosecha.service';
import { MovilService } from '../../../core/services/movil.service';
import { kg, pesos } from '../../../shared/formato';
import { MovilHeader } from '../../../shared/movil-header/movil-header';
import { FilaResumen, MovilResumen } from '../../../shared/movil-resumen/movil-resumen';

@Component({
  selector: 'app-movil-cosecha',
  imports: [FormsModule, MovilHeader, MovilResumen],
  templateUrl: './cosecha.html',
  styleUrl: './cosecha.css'
})
export class MovilCosecha {
  private readonly datos = inject(MovilService);
  private readonly cosechas = inject(CosechaService);

  readonly pendientes = this.datos.pendientes;
  readonly kgPorSaco = this.datos.cosecha.kgPorSaco;
  readonly kg = kg;

  calidad = 'Primera';
  sacos = 120;
  mermaKg = 80;
  motivo = 'golpe';
  destino = 'Bodega 1';

  readonly guardado = signal(false);

  get totalKg(): number {
    return this.sacos * this.kgPorSaco;
  }

  // Cómo queda el rendimiento del lote con esta cosecha
  get resumen(): FilaResumen[] {
    const acumulado = this.datos.cosecha.acumuladaKg + this.totalKg;
    return [
      { etiqueta: 'Cosecha acumulada', valor: kg(acumulado) },
      { etiqueta: 'Por hectárea', valor: kg(acumulado / this.datos.cosecha.areaHa) },
      { etiqueta: 'Costo por kg a hoy', valor: pesos(this.datos.cosecha.costoAcumulado / acumulado) }
    ];
  }

  guardar(): void {
    this.datos.pendientes.update((n) => n + 1);
    // La cosecha también queda en el módulo de Cosechas
    this.cosechas.agregar({
      fecha: this.cosechas.hoy(),
      loteId: 'a',
      calidad: this.calidad === 'Segunda' ? 'Segunda' : 'Primera',
      sacos: this.sacos,
      kg: this.totalKg,
      mermaKg: this.mermaKg || 0,
      motivoMerma: this.motivo || undefined,
      destino: this.destino,
      responsable: 'Mario R.'
    });
    this.guardado.set(true);
  }
}
