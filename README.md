# Agro360

Plataforma web y móvil para la gestión de fincas, de la siembra a la rentabilidad.

## Tecnologías

- Angular 20
- TypeScript
- Bootstrap 5 y Bootstrap Icons

## Requisitos

- Node.js 20 o superior
- npm

## Instalar dependencias

```bash
npm install
```

## Ejecutar

```bash
npm start
```

La aplicación queda en http://localhost:4200. La vista móvil está en /movil.

## Compilar para producción

```bash
npm run build
```

La aplicación compilada queda en `dist/agro360/browser`.

## Despliegue en Vercel

El repositorio ya trae `vercel.json` con la configuración. Para publicarlo:

1. Entra a Vercel, elige **Add New**, **Project** e importa este repositorio de GitHub.
2. Deja los valores que Vercel detecta: framework Angular, comando `npm run build` y carpeta de salida `dist/agro360/browser`.
3. Pulsa **Deploy**.

Cada push a una rama genera una vista previa, y la rama de producción se publica en el dominio principal. Todas las rutas (por ejemplo `/movil/registrar`) se redirigen a `index.html` para que funcionen al recargar la página.

## Mockups

Los diseños de referencia están en la carpeta `mockups/`.
