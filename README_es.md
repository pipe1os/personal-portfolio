# Portafolio Personal

[![Sitio en produccion](https://img.shields.io/badge/live-pipeos.dev-111111?style=for-the-badge&logo=vercel&logoColor=white)](https://pipeos.dev)
![Astro](https://img.shields.io/badge/Astro-7-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

<a href="./README.md">Read in English -></a>

Este es mi portafolio personal: quién soy, qué he construido, los pull requests que he logrado meter en proyectos open source y cómo contactarme, en español e inglés.

## De Dónde Viene

El proyecto partió desde la [plantilla de portafolio de Magic UI Design](https://github.com/magicuidesign/portfolio), una app en Next.js. Primero la migré a Astro + React y agregué el cambio de idioma entre español e inglés. Después rediseñé todo desde cero: no queda nada del aspecto, los componentes ni las animaciones de la plantilla. Lo que se mantuvo es el modelo de contenido y el soporte bilingüe.

## Diseño

La nueva identidad es un cartel tipográfico suizo sobre negro.

- **Grilla visible.** Una grilla de 12 columnas (8 en tablet, 4 en teléfono) ordena cada sección y se dibuja tenue detrás de la página. Las columnas vacías quedan a la vista en vez de rellenarse.
- **Tipografía.** [Mona Sans](https://github.com/github/mona-sans) como fuente variable, usando su eje de ancho para el nombre, y Monaspace Neon para fechas, repos, coordenadas y otros datos. Ambas están alojadas en el propio sitio, así que funcionan con la CSP.
- **Un solo color directo.** El bermellón `#ff4f1f` aparece solo en lo que está vivo o se puede presionar (PRs aceptados, proyectos activos, filas en hover) y en la sección de contacto.
- **Sin chips ni cards.** Las etiquetas son listas separadas por barras, las contribuciones son una tabla índice y los detalles de cada proyecto van en una lista de definiciones junto a su captura.

## Movimiento

- El nombre está compuesto letra por letra. Cada letra se ensancha al cargar, se expande bajo el cursor en escritorio y se condensa al hacer scroll (animación ligada al scroll con CSS).
- Las columnas de la grilla se dibujan al cargar. Títulos y filas suben desde una máscara en la línea base, y las imágenes entran con un barrido.
- Las filas que llevan a otro sitio se llenan de bermellón de izquierda a derecha con hover o foco de teclado.
- El header fijo se convierte en el nombre más un contador de sección ("03 / 06") al salir del inicio, y muestra la hora local de Concepción.
- El cambio de idioma usa la View Transitions API.
- Las cifras del inicio cuentan hacia arriba una vez al cargar.
- `prefers-reduced-motion` desactiva todo esto y deja el contenido estático y legible.

## Rendimiento

El rediseño eliminó Motion, react-markdown, Sonner, Radix y los componentes de Magic UI, reemplazándolos por animaciones CSS, unos pocos hooks e IntersectionObserver. El JS + CSS comprimido bajó de unos 203 KB a unos 104 KB.

## Stack

- Astro 7
- React 19 (una sola isla para la página)
- TypeScript
- Tailwind CSS 4
- Mona Sans y Monaspace Neon vía Fontsource
- Iconos Lucide
- Vercel

## Estructura del Proyecto

```text
src/pages/index.astro                Ruta principal; renderiza la isla React del portafolio
src/pages/404.astro                  Página de error con el mismo lenguaje visual
src/layouts/Layout.astro             Metadata, precarga de fuente, favicon y grilla de fondo
src/components/HomePage.tsx          Composición de la página, idioma y revelado al hacer scroll
src/components/display-name.tsx      Tipografía letra por letra (entrada, lente del cursor, condensado al scroll)
src/components/site-header.tsx       Header fijo: nombre, reloj local, contador de sección, ES/EN
src/components/section/              Marco de sección, proyectos, contribuciones open source, contacto
src/components/ui/svgs/              Iconos de marcas y estados de PR
src/data/resume.tsx                  Contenido, proyectos, contribuciones y textos ES/EN
src/styles/global.css                Tokens, grilla, tipografía y movimiento
public/                              Imágenes, favicon e iconos
```

## Ejecutar Localmente

Este proyecto usa `pnpm`. Node.js debe cumplir con `>=22.12.0`.

```bash
pnpm install
pnpm run dev
```

Antes de un build de producción, ejecuta el comando de revisión de Astro:

```bash
pnpm astro check
pnpm run build
pnpm run preview
```

## Crédito

El punto de partida original fue [magicuidesign/portfolio](https://github.com/magicuidesign/portfolio). Gracias a sus autores por la base desde la que aprendí. El diseño, los componentes y el movimiento actuales son míos.
