import { Injectable, signal } from '@angular/core';
import { TipoAlerta } from '../models/alerta';

export interface AlertaMovil {
  tipo: TipoAlerta;
  titulo: string;
  detalle: string;
  destacada?: boolean;
}

export interface AccionRegistro {
  id: string;
  etiqueta: string;
  icono: string;
  ruta?: string; // sin ruta = próximamente
}

@Injectable({ providedIn: 'root' })
export class MovilService {
  readonly acciones: AccionRegistro[] = [
    { id: 'riego', etiqueta: 'Riego', icono: 'bi-droplet' },
    { id: 'fertilizacion', etiqueta: 'Fertilización', icono: 'bi-flower1', ruta: '/movil/labor' },
    { id: 'plagas', etiqueta: 'Plagas', icono: 'bi-bug' },
    { id: 'jornal', etiqueta: 'Jornal', icono: 'bi-person' },
    { id: 'maquinaria', etiqueta: 'Maquinaria', icono: 'bi-truck' },
    { id: 'cosecha', etiqueta: 'Cosecha', icono: 'bi-basket', ruta: '/movil/cosecha' }
  ];

  readonly alertas: AlertaMovil[] = [
    { tipo: 'plaga', titulo: 'Plaga · Lote A', detalle: 'Posible gota, sector norte', destacada: true },
    { tipo: 'clima', titulo: 'Lluvia mañana', detalle: 'Posponer fertilización Lote C' },
    { tipo: 'bodega', titulo: 'Bodega', detalle: 'Fungicida vence en 12 días' },
    { tipo: 'riego', titulo: 'Riego · Lote B', detalle: 'Humedad suficiente, omitir' }
  ];

  readonly clima = { maxima: 21, minima: 9, lluviaManana: 70 };

  // Valores de ejemplo para calcular el efecto de una labor
  readonly productos = ['NPK 10-30-10', 'Urea'];
  readonly kgPorBulto = 50;
  readonly precioBulto = 52000;
  readonly valorJornal = 70000;
  readonly valorHoraTractor = 190000 / 3;

  // Valores de ejemplo de la cosecha del Lote A
  readonly cosecha = { acumuladaKg: 12000, areaHa: 5, costoAcumulado: 12888000, kgPorSaco: 50 };

  // Registros guardados en el celular que esperan señal
  readonly pendientes = signal(3);
}
