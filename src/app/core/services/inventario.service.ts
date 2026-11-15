import { Injectable } from '@angular/core';
import { Producto, ResumenInventario } from '../models/inventario';

@Injectable({ providedIn: 'root' })
export class InventarioService {
  readonly resumen: ResumenInventario = { productos: 38, valorBodega: 14.2, porVencer: 4, bajoMinimo: 2 };

  private readonly productos: Producto[] = [
    { id: 1, nombre: 'NPK 10-30-10', tipo: 'Fertilizante', unidad: 'kg', existencia: 1200, minimo: 500 },
    { id: 2, nombre: 'Fungicida X', tipo: 'Fitosanitario', unidad: 'L', existencia: 6, minimo: 10, venceEnDias: 12 },
    { id: 3, nombre: 'Semilla papa', tipo: 'Semilla', unidad: 'kg', existencia: 0, minimo: 0 },
    { id: 4, nombre: 'ACPM', tipo: 'Combustible', unidad: 'gal', existencia: 85, minimo: 40 },
    { id: 5, nombre: 'Herbicida Y', tipo: 'Fitosanitario', unidad: 'L', existencia: 18, minimo: 10, vence: 'mar 2027' },
    { id: 6, nombre: 'Urea', tipo: 'Fertilizante', unidad: 'kg', existencia: 400, minimo: 300 }
  ];

  private readonly movimientos: string[] = [
    '12 jul · Salida · Fungicida X −2 L · Lote A · Luz M.',
    '10 jul · Entrada · NPK 10-30-10 +1.500 kg · Proveedor Agro Sur'
  ];

  listarProductos(): Producto[] {
    return this.productos;
  }

  listarMovimientos(): string[] {
    return this.movimientos;
  }

  buscarPorNombre(nombre: string): Producto | undefined {
    return this.productos.find((p) => p.nombre === nombre);
  }

  // Descuenta la existencia y deja el movimiento; devuelve false si no alcanza
  registrarSalida(productoId: number, cantidad: number, detalle: string): boolean {
    const producto = this.productos.find((p) => p.id === productoId);
    if (!producto || cantidad <= 0 || producto.existencia < cantidad) {
      return false;
    }
    producto.existencia -= cantidad;
    const fecha = new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }).replace('.', '');
    this.movimientos.unshift(fecha + ' · Salida · ' + producto.nombre + ' −' + cantidad + ' ' + producto.unidad + ' · ' + detalle);
    return true;
  }
}
