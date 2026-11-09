export interface MenuItem {
  etiqueta: string;
  ruta?: string; // sin ruta = próximamente
}

export interface MenuGrupo {
  titulo?: string;
  items: MenuItem[];
}

export const MENU: MenuGrupo[] = [
  { items: [{ etiqueta: 'Tablero', ruta: '/tablero' }] },
  {
    titulo: 'Producción',
    items: [
      { etiqueta: 'Fincas' },
      { etiqueta: 'Lotes', ruta: '/lotes' },
      { etiqueta: 'Cultivos' },
      { etiqueta: 'Cosechas' }
    ]
  },
  {
    titulo: 'Recursos y operación',
    items: [
      { etiqueta: 'Riego' },
      { etiqueta: 'Fertilización' },
      { etiqueta: 'Plagas' },
      { etiqueta: 'Trabajadores' },
      { etiqueta: 'Maquinaria' },
      { etiqueta: 'Inventario', ruta: '/inventario' }
    ]
  },
  {
    titulo: 'Comercial y financiero',
    items: [
      { etiqueta: 'Ventas', ruta: '/ventas' },
      { etiqueta: 'Clientes' },
      { etiqueta: 'Finanzas' }
    ]
  },
  {
    titulo: 'Inteligencia',
    items: [
      { etiqueta: 'Mapas' },
      { etiqueta: 'Clima' },
      { etiqueta: 'Alertas', ruta: '/alertas' },
      { etiqueta: 'Reportes' }
    ]
  }
];
