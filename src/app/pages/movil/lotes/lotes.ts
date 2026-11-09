import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FincaService } from '../../../core/services/finca.service';
import { LoteService } from '../../../core/services/lote.service';
import { MovilHeader } from '../../../shared/movil-header/movil-header';
import { PlaceholderBox } from '../../../shared/placeholder-box/placeholder-box';

@Component({
  selector: 'app-movil-lotes',
  imports: [RouterLink, MovilHeader, PlaceholderBox],
  templateUrl: './lotes.html',
  styleUrl: './lotes.css'
})
export class MovilLotes {
  readonly finca = inject(FincaService);
  readonly lotes = inject(LoteService).listar();
}
