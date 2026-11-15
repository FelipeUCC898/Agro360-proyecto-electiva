export interface MenuItem {
  etiqueta: string;
  ruta?: string; // sin ruta = próximamente
}

export interface MenuGrupo {
  titulo?: string;
  items: MenuItem[];
}

// Módulos con pantalla: van siempre visibles en el menú
export const MENU: MenuGrupo[] = [
  { items: [{ etiqueta: 'Tablero', ruta: '/tablero' }] },
  {
    titulo: 'Producción',
    items: [
      { etiqueta: 'Fincas', ruta: '/fincas' },
      { etiqueta: 'Lotes', ruta: '/lotes' },
      { etiqueta: 'Cultivos', ruta: '/cultivos' },
      { etiqueta: 'Cosechas', ruta: '/cosechas' }
    ]
  },
  {
    titulo: 'Recursos y operación',
    items: [
      { etiqueta: 'Riego', ruta: '/riego' },
      { etiqueta: 'Fertilización', ruta: '/fertilizacion' },
      { etiqueta: 'Plagas', ruta: '/plagas' },
      { etiqueta: 'Trabajadores', ruta: '/trabajadores' },
      { etiqueta: 'Inventario', ruta: '/inventario' }
    ]
  },
  {
    titulo: 'Comercial y financiero',
    items: [
      { etiqueta: 'Ventas', ruta: '/ventas' },
      { etiqueta: 'Clientes', ruta: '/clientes' }
    ]
  },
  {
    titulo: 'Inteligencia',
    items: [
      { etiqueta: 'Mapas', ruta: '/mapas' },
      { etiqueta: 'Clima', ruta: '/clima' },
      { etiqueta: 'Alertas', ruta: '/alertas' },
      { etiqueta: 'Reportes', ruta: '/reportes' }
    ]
  }
];

// Módulos que todavía no tienen pantalla: quedan recogidos en "Más módulos"
export const MENU_PROXIMAMENTE: MenuItem[] = [
  { etiqueta: 'Maquinaria' },
  { etiqueta: 'Finanzas' }
];
