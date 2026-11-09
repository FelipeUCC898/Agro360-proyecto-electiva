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
  { titulo: 'Producción', items: [{ etiqueta: 'Lotes', ruta: '/lotes' }] },
  { titulo: 'Recursos y operación', items: [{ etiqueta: 'Inventario', ruta: '/inventario' }] },
  { titulo: 'Comercial y financiero', items: [{ etiqueta: 'Ventas', ruta: '/ventas' }] },
  {
    titulo: 'Inteligencia',
    items: [
      { etiqueta: 'Alertas', ruta: '/alertas' },
      { etiqueta: 'Reportes', ruta: '/reportes' }
    ]
  }
];

// Módulos que todavía no tienen pantalla: quedan recogidos en "Más módulos"
export const MENU_PROXIMAMENTE: MenuItem[] = [
  { etiqueta: 'Fincas' },
  { etiqueta: 'Cultivos' },
  { etiqueta: 'Cosechas' },
  { etiqueta: 'Riego' },
  { etiqueta: 'Fertilización' },
  { etiqueta: 'Plagas' },
  { etiqueta: 'Trabajadores' },
  { etiqueta: 'Maquinaria' },
  { etiqueta: 'Clientes' },
  { etiqueta: 'Finanzas' },
  { etiqueta: 'Mapas' },
  { etiqueta: 'Clima' }
];
