import { Injectable } from '@angular/core';
import { Alerta } from '../models/alerta';

@Injectable({ providedIn: 'root' })
export class AlertaService {
  private readonly alertas: Alerta[] = [
    { id: 1, tipo: 'plaga', titulo: 'Posible gota en Lote A', detalle: 'Sector norte · revisar hoy', prioridad: 'urgente' },
    { id: 2, tipo: 'clima', titulo: 'Lluvia 70% mañana', detalle: 'Posponer fertilización del Lote C', prioridad: 'aviso' },
    { id: 3, tipo: 'bodega', titulo: 'Fungicida X vence en 12 días', detalle: 'Usar primero', prioridad: 'aviso' },
    { id: 4, tipo: 'riego', titulo: 'Lote B con humedad suficiente', detalle: 'Se omite el riego de hoy', prioridad: 'info' },
    { id: 5, tipo: 'maquinaria', titulo: 'Tractor JD: mantenimiento', detalle: 'Faltan 20 horas de uso', prioridad: 'info' }
  ];

  listar(): Alerta[] {
    return this.alertas;
  }
}
