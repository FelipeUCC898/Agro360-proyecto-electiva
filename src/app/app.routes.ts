import { Routes } from '@angular/router';
import { WebLayout } from './layout/web-layout/web-layout';
import { MovilLayout } from './layout/movil-layout/movil-layout';

export const routes: Routes = [
  {
    path: '',
    component: WebLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'tablero' },
      { path: 'tablero', title: 'Tablero · Agro360', loadComponent: () => import('./pages/web/tablero/tablero').then((m) => m.Tablero) },
      { path: 'lotes', title: 'Lotes · Agro360', loadComponent: () => import('./pages/web/lotes/lotes').then((m) => m.Lotes) },
      { path: 'lotes/:id/costos', title: 'Costo del lote · Agro360', loadComponent: () => import('./pages/web/costo-lote/costo-lote').then((m) => m.CostoLote) },
      { path: 'inventario', title: 'Inventario · Agro360', loadComponent: () => import('./pages/web/inventario/inventario').then((m) => m.Inventario) },
      { path: 'ventas', title: 'Ventas · Agro360', loadComponent: () => import('./pages/web/ventas/ventas').then((m) => m.Ventas) },
      { path: 'alertas', title: 'Alertas · Agro360', loadComponent: () => import('./pages/web/alertas/alertas').then((m) => m.Alertas) },
      { path: 'reportes', title: 'Reportes · Agro360', loadComponent: () => import('./pages/web/reportes/reportes').then((m) => m.Reportes) }
    ]
  },
  {
    path: 'movil',
    component: MovilLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'registrar' },
      { path: 'registrar', title: 'Registrar · Agro360', loadComponent: () => import('./pages/movil/registrar/registrar').then((m) => m.MovilRegistrar) },
      { path: 'labor', title: 'Labor · Agro360', loadComponent: () => import('./pages/movil/labor/labor').then((m) => m.MovilLabor) },
      { path: 'cosecha', title: 'Cosecha · Agro360', loadComponent: () => import('./pages/movil/cosecha/cosecha').then((m) => m.MovilCosecha) },
      { path: 'alertas', title: 'Alertas · Agro360', loadComponent: () => import('./pages/movil/alertas/alertas').then((m) => m.MovilAlertas) },
      { path: 'lotes', title: 'Mis lotes · Agro360', loadComponent: () => import('./pages/movil/lotes/lotes').then((m) => m.MovilLotes) }
    ]
  },
  { path: '**', redirectTo: 'tablero' }
];
