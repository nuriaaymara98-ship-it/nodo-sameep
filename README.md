# NODO — SAMEEP (prototipo)

Prototipo de rediseño de la plataforma interna de SAMEEP (antes "CONECTAMOS / PCO"),
ahora renombrada **NODO**. Mantiene todo el contenido real del sitio actual
(https://planificacion.sameep.gob.ar:1444/) pero con:

- Nueva identidad: **NODO** en vez de "PCO", con isotipo real de SAMEEP recortado del logo oficial.
- Paleta 100% azul institucional (tomada del logo SAMEEP y de tonos de identidad
  de Gobierno del Chaco), reemplazando el verde oliva que no correspondía a la marca.
- Las 6 herramientas de gestión visibles de entrada (Visor de Mapas, Monitoreo,
  Base de Datos, Gestión de Proyectos, Planeamiento, Presupuestos) — antes solo
  se veían 2 o 3 por el carrusel.
- CTAs reales como botones (antes eran links de texto poco visibles).
- Buscador + filtros por pestaña funcionando en "Áreas de intervención".
- Menú responsive con hamburguesa para mobile + menú "Más" desplegable en desktop.
- Diseño basado en la estructura visual de [ips.or.cr](http://ips.or.cr/): header fijo
  con efecto vidrio esmerilado, tipografía serif (Playfair Display) para títulos +
  sans (Inter) para texto, botones tipo píldora con elevación al hover, tarjetas con
  borde superior animado, sección de novedades + newsletter.

## Estructura

```
nodo-sameep/
├── index.html      → toda la página (una sola vista, con anclas por sección)
├── style.css        → estilos y paleta de colores
├── script.js         → menú móvil, menú "Más", buscador/filtros de proyectos, scroll header
├── netlify.toml      → configuración mínima para Netlify
└── assets/
    ├── sameep-blanco.png    → logo SAMEEP oficial (versión blanca, para fondo oscuro/footer)
    ├── sameep-isotipo.png   → isotipo SAMEEP en color, recortado para el header claro
    └── favicon.svg
```

## Cómo subirlo a Netlify

**Opción 1 — arrastrar y soltar (la más simple):**
1. Entrá a https://app.netlify.com/drop
2. Arrastrá la carpeta `nodo-sameep` completa (o comprimila en `.zip` y subila).
3. Netlify te da una URL al instante (ej. `nodo-sameep.netlify.app`).
4. Desde el panel del sitio podés cambiar el nombre en *Site settings → Change site name*.

**Opción 2 — con cuenta y Git (para poder seguir editando):**
1. Subí la carpeta `nodo-sameep` a un repositorio (GitHub/GitLab).
2. En Netlify: *Add new site → Import an existing project*.
3. Build command: dejalo vacío. Publish directory: `.` (raíz del repo, ya está
   configurado en `netlify.toml`).
4. Deploy.

No requiere build ni dependencias: es HTML/CSS/JS plano.

## Qué es prototipo todavía

Los botones "Ver proyectos", "Ver documentación", "Iniciar sesión" y las tarjetas de
"Herramientas" y "Trabajo" apuntan a `#` (no hay backend real). El Visor de Mapas,
Monitoreo y Base de Datos figuran como "Activo" porque ya existen en la plataforma real;
Gestión de Proyectos, Planeamiento y Presupuestos están marcados "Próximamente" porque
hoy no están disponibles en el sitio en producción.
