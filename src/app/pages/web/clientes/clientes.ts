import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente, TipoCliente } from '../../../core/models/cliente';
import { Factura } from '../../../core/models/venta';
import { ClienteService } from '../../../core/services/cliente.service';
import { FincaService } from '../../../core/services/finca.service';
import { VentaService } from '../../../core/services/venta.service';
import { millones, pesos, kg } from '../../../shared/formato';
import { KpiCard } from '../../../shared/kpi-card/kpi-card';
import { PageHeader } from '../../../shared/page-header/page-header';
import { StatusPill, TonoPill } from '../../../shared/status-pill/status-pill';

interface ResumenCliente {
  cliente: Cliente;
  compras: number; // millones de pesos
  porCobrar: number;
  vencido: number;
  facturas: Factura[];
}

@Component({
  selector: 'app-clientes',
  imports: [FormsModule, PageHeader, KpiCard, StatusPill],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes {
  private readonly clientesServicio = inject(ClienteService);
  private readonly facturas = inject(VentaService).listarFacturas();

  readonly finca = inject(FincaService);
  readonly millones = millones;
  readonly pesos = pesos;
  readonly kg = kg;
  readonly tipos: TipoCliente[] = ['Mayorista', 'Restaurante', 'Agroindustria'];

  // Los totales salen de las facturas, no se guardan
  readonly resumenes = computed<ResumenCliente[]>(() =>
    this.clientesServicio.lista().map((cliente) => {
      const suyas = this.facturas.filter((f) => f.cliente === cliente.nombre);
      const suma = (filtro: (f: Factura) => boolean) => suyas.filter(filtro).reduce((s, f) => s + f.kg * f.precioKg, 0) / 1000000;
      return {
        cliente,
        compras: suma(() => true),
        porCobrar: suma((f) => f.estado !== 'Pagada'),
        vencido: suma((f) => f.estado === 'Vencida'),
        facturas: suyas
      };
    })
  );

  readonly totalVendido = computed(() => this.resumenes().reduce((s, r) => s + r.compras, 0));
  readonly totalPorCobrar = computed(() => this.resumenes().reduce((s, r) => s + r.porCobrar, 0));
  readonly principal = computed(() => [...this.resumenes()].sort((a, b) => b.compras - a.compras)[0]?.cliente.nombre ?? '—');

  readonly seleccionado = signal<number | null>(null);
  readonly detalle = computed(() => this.resumenes().find((r) => r.cliente.id === this.seleccionado()));

  // Formulario de nuevo cliente
  nombre = '';
  tipo: TipoCliente = 'Mayorista';
  contacto = '';
  telefono = '';
  ciudad = '';

  estado(r: ResumenCliente): { texto: string; tono: TonoPill } {
    if (r.compras === 0) {
      return { texto: 'Sin compras', tono: 'neutro' };
    }
    if (r.vencido > 0) {
      return { texto: 'Vencido', tono: 'peligro' };
    }
    return r.porCobrar > 0 ? { texto: 'Con saldo', tono: 'aviso' } : { texto: 'Al día', tono: 'ok' };
  }

  tonoFactura(estado: string): TonoPill {
    return estado === 'Pagada' ? 'ok' : estado === 'Vencida' ? 'peligro' : 'aviso';
  }

  elegir(id: number): void {
    this.seleccionado.set(this.seleccionado() === id ? null : id);
  }

  guardar(): void {
    if (!this.nombre || !this.contacto || !this.ciudad) {
      return;
    }
    this.clientesServicio.agregar({ nombre: this.nombre, tipo: this.tipo, contacto: this.contacto, telefono: this.telefono, ciudad: this.ciudad });
    this.nombre = '';
    this.contacto = '';
    this.telefono = '';
    this.ciudad = '';
  }
}
