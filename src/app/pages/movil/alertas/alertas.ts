import { Component, inject } from '@angular/core';
import { ICONO_ALERTA } from '../../../core/models/alerta';
import { FincaService } from '../../../core/services/finca.service';
import { MovilService } from '../../../core/services/movil.service';
import { MovilHeader } from '../../../shared/movil-header/movil-header';

@Component({
  selector: 'app-movil-alertas',
  imports: [MovilHeader],
  templateUrl: './alertas.html',
  styleUrl: './alertas.css'
})
export class MovilAlertas {
  private readonly datos = inject(MovilService);

  readonly finca = inject(FincaService);
  readonly alertas = this.datos.alertas;
  readonly clima = this.datos.clima;
  readonly iconos = ICONO_ALERTA;
}
