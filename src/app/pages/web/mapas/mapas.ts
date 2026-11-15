import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICONO_ALERTA } from '../../../core/models/alerta';
import { Lote } from '../../../core/models/lote';
import { ClimaService } from '../../../core/services/clima.service';
import { FincaService } from '../../../core/services/finca.service';
import { LoteService } from '../../../core/services/lote.service';
import { MapaService } from '../../../core/services/mapa.service';
import { pesos } from '../../../shared/formato';
import { PageHeader } from '../../../shared/page-header/page-header';

type Capa = 'margen' | 'cultivo' | 'estado';

interface ItemLeyenda {
  color: string;
  texto: string;
}

const COLOR_CULTIVO: Record<string, string> = { Papa: '#d9b36a', Maíz: '#e3c84a', Hortalizas: '#7fbf6a' };

@Component({
  selector: 'app-mapas',
  imports: [RouterLink, PageHeader],
  templateUrl: './mapas.html',
  styleUrl: './mapas.css'
})
export class Mapas {
  private readonly mapa = inject(MapaService);
  private readonly lotesServicio = inject(LoteService);

  readonly finca = inject(FincaService);
  readonly lluviaManana = inject(ClimaService).lluviaManana();
  readonly pesos = pesos;
  readonly iconos = ICONO_ALERTA;
  readonly contorno = this.mapa.contorno;
  readonly marcadores = this.mapa.listarMarcadores();
  readonly capas: { id: Capa; etiqueta: string }[] = [
    { id: 'margen', etiqueta: 'Margen' },
    { id: 'cultivo', etiqueta: 'Cultivo' },
    { id: 'estado', etiqueta: 'Estado' }
  ];

  readonly capa = signal<Capa>('margen');
  readonly seleccion = signal<string | null>(null);

  readonly poligonos = computed(() =>
    this.mapa.listarPoligonos().flatMap((p) => {
      const lote = this.lotesServicio.obtener(p.loteId);
      return lote ? [{ lote, puntos: p.puntos, color: this.color(lote), centro: this.mapa.centro(p.puntos) }] : [];
    })
  );

  readonly elegido = computed(() => this.lotesServicio.obtener(this.seleccion() ?? ''));

  readonly leyenda = computed<ItemLeyenda[]>(() => {
    switch (this.capa()) {
      case 'margen':
        return [
          { color: '#97bc62', texto: '30 % o más' },
          { color: '#e3b25a', texto: 'Entre 20 y 29 %' },
          { color: '#d9806f', texto: 'Menos de 20 %' }
        ];
      case 'cultivo':
        return Object.entries(COLOR_CULTIVO).map(([texto, color]) => ({ color, texto }));
      default:
        return [
          { color: '#97bc62', texto: 'Cosechado' },
          { color: '#7fb3cf', texto: 'En producción' }
        ];
    }
  });

  private color(lote: Lote): string {
    switch (this.capa()) {
      case 'margen':
        return lote.margen >= 30 ? '#97bc62' : lote.margen >= 20 ? '#e3b25a' : '#d9806f';
      case 'cultivo':
        return COLOR_CULTIVO[lote.cultivo.split(' ')[0]] ?? '#b9c9b5';
      default:
        return lote.estado === 'Cosechado' ? '#97bc62' : '#7fb3cf';
    }
  }

  elegir(id: string): void {
    this.seleccion.set(id);
  }
}
