# NODO — SAMEEP (prototipo)

Prototipo de rediseño de la plataforma interna de SAMEEP (antes "CONECTAMOS / PCO"),
ahora renombrada **NODO**. Mantiene todo el contenido real del sitio actual
(https://planificacion.sameep.gob.ar:1444/) pero con:

- Nueva identidad: **NODO** en vez de "PCO", con isotipo real de SAMEEP recortado del logo oficial.
- Paleta y tipografía tomadas del **manual de marca oficial** ("Pautas para los módulos
  de la plataforma", Propuesta home PCO): Azul Noche `#00203A`, Azul Laguna `#063565`,
  Río Azulado `#5059BC`, Verde Naturaleza `#8A9A46`, Verde Agricultura `#C8D29C` y
  Fucsia Lapacho `#F26DF9`. Tipografía Montserrat en todo el sitio. Botones sólidos
  navy con la palabra "Ver" subrayada, íconos circulares con borde verde, texto
  descriptivo en itálica — siguiendo el estilo del mockup original.
- Las 4 áreas de intervención (Optimización, Planes y Proyectos, Modernización,
  Planeamiento) usan los 4 colores del manual, igual que en la propuesta original.
- Logos de SAMEEP y Gobierno del Chaco en el footer (versión para fondo oscuro,
  recortada del propio manual).
- CTAs reales como botones (antes eran links de texto poco visibles).
- Buscador + filtros por pestaña funcionando en "Áreas de intervención", conectado
  con las tarjetas de "Herramientas → Áreas de intervención".
- Menú responsive con hamburguesa para mobile + menú "Más" desplegable en desktop.
- Estructura de página basada en [ips.or.cr](http://ips.or.cr/): header fijo con
  efecto vidrio esmerilado, botones tipo píldora con elevación al hover, tarjetas
  con borde superior animado, sección de novedades + newsletter.

## Estructura

```
nodo-sameep/
├── index.html      → estructura de la página (el texto de respaldo es el mismo que content.json)
├── style.css        → estilos y paleta de colores
├── script.js         → carga content.json + menú móvil, menú "Más", buscador/filtros, scroll header
├── content.json       → TODO el texto e imágenes editables del home (esto edita el panel /admin)
├── netlify.toml      → configuración mínima para Netlify
├── admin/
│   ├── index.html    → carga Decap CMS
│   └── config.yml    → define los campos editables del panel (en español)
└── assets/
    ├── sameep-blanco.png    → logo SAMEEP oficial (versión blanca, para fondo oscuro/footer)
    ├── sameep-isotipo.png   → isotipo SAMEEP en color, recortado para el header claro
    ├── hero-planta.webp     → foto de portada
    ├── uploads/             → acá van las imágenes que subas desde el panel /admin
    └── favicon.svg
```

## Editar en LOCAL, en tu propia PC (recomendado para probar / mientras conectás Netlify)

No hace falta GitHub ni Netlify para editar. Decap CMS tiene un "modo local": un
mini-servidor que corre en tu computadora y guarda los cambios directo en estos
archivos, sin login real.

**Necesitás tener [Node.js](https://nodejs.org) instalado** (una sola vez). Después,
cada vez que quieras editar:

1. Abrí una terminal en la carpeta `nodo-sameep` y corré:
   ```
   npx decap-server
   ```
   Dejalo abierto — es el que guarda tus cambios en los archivos.
2. En **otra** terminal (sin cerrar la anterior), en la misma carpeta, corré:
   ```
   npx serve . -p 5173
   ```
   Esto sirve el sitio.
3. Abrí en el navegador **http://localhost:5173/admin/**. Te va a aparecer un botón
   "Iniciar sesión" — hacé clic (no pide usuario ni contraseña, es solo para entrar).
4. Editá lo que quieras y tocá **Publish**. El cambio queda guardado en los archivos
   de la carpeta al instante — podés recargar `http://localhost:5173/` y ya lo vas a ver.

Cuando quieras subir esos cambios a internet (Netlify), simplemente hacés `git commit`
+ `git push` como venimos haciendo, o me pedís a mí que lo haga.

## Editar desde internet, sin tener que abrir nada en tu PC (Netlify + GitHub)

Esto es un paso más, pero te permite editar desde cualquier lado (celular, otra PC) sin
depender de tener la terminal abierta. Para que funcione necesita estar conectado a
GitHub — **no funciona con Netlify Drop** (arrastrar y soltar), porque el panel guarda
los cambios haciendo un commit al repositorio y Netlify necesita ese repositorio para
volver a publicar automáticamente.

Pasos (se hacen una sola vez):

1. **Crear un repositorio en GitHub** (gratis, en https://github.com/new). Nombre sugerido:
   `nodo-sameep`. Dejalo vacío (sin README).
2. **Subir este proyecto** al repositorio. Ya está inicializado como repo Git en esta carpeta
   con el primer commit hecho — solo falta conectarlo:
   ```
   git remote add origin https://github.com/TU-USUARIO/nodo-sameep.git
   git push -u origin main
   ```
   (Pedime esto a mí y lo hago si me pasás la URL del repo vacío que creaste.)
3. **En Netlify**: *Add new site → Import an existing project* → elegí GitHub → seleccioná
   el repo `nodo-sameep`. Build command: vacío. Publish directory: `.` (ya configurado en
   `netlify.toml`). Deploy.
4. **Activar Netlify Identity**: en el panel del sitio → *Site configuration → Identity →
   Enable Identity*.
5. **Activar Git Gateway**: dentro de Identity → *Services → Git Gateway → Enable Git Gateway*.
6. **Invitarte como usuaria**: Identity → *Invite users* → tu email → confirmás la invitación
   que te llega por correo y elegís una contraseña.
7. Entrá a `https://TU-SITIO.netlify.app/admin/`, iniciá sesión, y ya podés editar todos los
   textos e imágenes del home desde un formulario visual. Al tocar **Publish**, el panel
   guarda el cambio en GitHub y Netlify vuelve a publicar el sitio solo (tarda ~1 minuto).

Después de este setup inicial, **no volvés a tocar código ni a subir zips**: todo se edita
desde `/admin`.

## Cómo subirlo a Netlify sin el panel de edición (más simple, pero sin /admin)

Si por ahora solo querés verlo publicado, sin el panel de edición:
1. Entrá a https://app.netlify.com/drop
2. Arrastrá la carpeta `nodo-sameep` completa (o comprimila en `.zip` y subila).
3. Netlify te da una URL al instante (ej. `nodo-sameep.netlify.app`).

Podés migrar después al flujo con GitHub de arriba sin perder nada.

No requiere build ni dependencias: es HTML/CSS/JS plano.

## Qué es prototipo todavía

Los botones "Ver proyectos", "Ver documentación", "Iniciar sesión" y las tarjetas de
"Herramientas" y "Trabajo" apuntan a `#` (no hay backend real). El Visor de Mapas,
Monitoreo y Base de Datos figuran como "Activo" porque ya existen en la plataforma real;
Gestión de Proyectos, Planeamiento y Presupuestos están marcados "Próximamente" porque
hoy no están disponibles en el sitio en producción.
