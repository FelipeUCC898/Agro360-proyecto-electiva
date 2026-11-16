import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SeveridadPlaga } from '../../../core/models/incidencia';
import { InventarioService } from '../../../core/services/inventario.service';
import { PlagaService } from '../../../core/services/plaga.service';
import { MovilHeader } from '../../../shared/movil-header/movil-header';
import { FilaResumen, MovilResumen } from '../../../shared/movil-resumen/movil-resumen';

@Component({
  selector: 'app-movil-plagas',
  imports: [FormsModule, MovilHeader, MovilResumen],
  templateUrl: './plagas.html',
  styleUrl: './plagas.css'
})
export class MovilPlagas {
  private readonly router = inject(Router);
  private readonly servicio = inject(PlagaService);
  private readonly inventario = inject(InventarioService);

  readonly nombres = this.servicio.nombres;
  readonly sectores = this.servicio.sectores;
  readonly severidades: SeveridadPlaga[] = ['Baja', 'Media', 'Alta'];

  nombre = this.nombres[0];
  severidad: SeveridadPlaga = 'Media';
  sector = this.sectores[0];
  observacion = '';

  readonly fotoNombre = signal('');

  // Lo que pasa al enviar el reporte
  get resumen(): FilaResumen[] {
    const fungicida = this.inventario.buscarPorNombre('Fungicida X');
    return [
      { etiqueta: 'Alerta que se crea', valor: this.severidad === 'Alta' ? 'Urgente' : 'Ninguna' },
      { etiqueta: 'Existencia de Fungicida X', valor: fungicida ? fungicida.existencia + ' ' + fungicida.unidad : '—' }
    ];
  }

  elegirFoto(evento: Event): void {
    const archivo = (evento.target as HTMLInputElement).files?.[0];
    this.fotoNombre.set(archivo ? archivo.name : '');
  }

  enviar(): void {
    this.servicio.reportar('a', this.nombre, this.severidad, this.sector);
    this.router.navigateByUrl('/movil/registrar');
  }
}
