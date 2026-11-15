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
      { path: 'fincas', title: 'Fincas · Agro360', loadComponent: () => import('./pages/web/fincas/fincas').then((m) => m.Fincas) },
      { path: 'lotes', title: 'Lotes · Agro360', loadComponent: () => import('./pages/web/lotes/lotes').then((m) => m.Lotes) },
      { path: 'lotes/:id/costos', title: 'Costo del lote · Agro360', loadComponent: () => import('./pages/web/costo-lote/costo-lote').then((m) => m.CostoLote) },
      { path: 'cultivos', title: 'Cultivos · Agro360', loadComponent: () => import('./pages/web/cultivos/cultivos').then((m) => m.Cultivos) },
      { path: 'cosechas', title: 'Cosechas · Agro360', loadComponent: () => import('./pages/web/cosechas/cosechas').then((m) => m.Cosechas) },
      { path: 'riego', title: 'Riego · Agro360', loadComponent: () => import('./pages/web/riego/riego').then((m) => m.Riego) },
      { path: 'fertilizacion', title: 'Fertilización · Agro360', loadComponent: () => import('./pages/web/fertilizacion/fertilizacion').then((m) => m.Fertilizacion) },
      { path: 'plagas', title: 'Plagas · Agro360', loadComponent: () => import('./pages/web/plagas/plagas').then((m) => m.Plagas) },
      { path: 'inventario', title: 'Inventario · Agro360', loadComponent: () => import('./pages/web/inventario/inventario').then((m) => m.Inventario) },
      { path: 'ventas', title: 'Ventas · Agro360', loadComponent: () => import('./pages/web/ventas/ventas').then((m) => m.Ventas) },
      { path: 'clientes', title: 'Clientes · Agro360', loadComponent: () => import('./pages/web/clientes/clientes').then((m) => m.Clientes) },
      { path: 'alertas', title: 'Alertas · Agro360', loadComponent: () => import('./pages/web/alertas/alertas').then((m) => m.Alertas) },
      { path: 'reportes', title: 'Reportes · Agro360', loadComponent: () => import('./pages/web/reportes/reportes').then((m) => m.Reportes) },
      { path: 'mapas', title: 'Mapas · Agro360', loadComponent: () => import('./pages/web/mapas/mapas').then((m) => m.Mapas) },
      { path: 'clima', title: 'Clima · Agro360', loadComponent: () => import('./pages/web/clima/clima').then((m) => m.Clima) }
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
      { path: 'riego', title: 'Registrar riego · Agro360', loadComponent: () => import('./pages/movil/riego/riego').then((m) => m.MovilRiego) },
      { path: 'plagas', title: 'Reportar plaga · Agro360', loadComponent: () => import('./pages/movil/plagas/plagas').then((m) => m.MovilPlagas) },
      { path: 'alertas', title: 'Alertas · Agro360', loadComponent: () => import('./pages/movil/alertas/alertas').then((m) => m.MovilAlertas) },
      { path: 'lotes', title: 'Mis lotes · Agro360', loadComponent: () => import('./pages/movil/lotes/lotes').then((m) => m.MovilLotes) }
    ]
  },
  { path: '**', redirectTo: 'tablero' }
];
