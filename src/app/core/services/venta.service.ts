import { Injectable } from '@angular/core';
import { Despacho, Factura } from '../models/venta';

@Injectable({ providedIn: 'root' })
export class VentaService {
  readonly clientes = ['Plaza Mayorista', 'Rest. El Roble'];

  readonly despacho: Despacho = { cosechadoKg: 30000, despachadoKg: 28800, mermaKg: 1200, saldoKg: 0 };

  private readonly facturas: Factura[] = [
    { numero: 'F-0142', cliente: 'Plaza Mayorista', lote: 'A', kg: 18000, precioKg: 1150, estado: 'Pagada' },
    { numero: 'F-0143', cliente: 'Rest. El Roble', lote: 'A', kg: 9000, precioKg: 950, estado: 'Por cobrar' },
    { numero: 'F-0144', cliente: 'Plaza Mayorista', lote: 'A', kg: 1800, precioKg: 900, estado: 'Vencida' }
  ];

  listarFacturas(): Factura[] {
    return this.facturas;
  }
}
