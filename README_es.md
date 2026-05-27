# Portafolio Personal

[![Sitio en produccion](https://img.shields.io/badge/live-pipeos.dev-111111?style=for-the-badge&logo=vercel&logoColor=white)](https://pipeos.dev)
![Astro](https://img.shields.io/badge/Astro-6.2-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

Este es mi portafolio personal. Presenta mi perfil, habilidades, proyectos, educación y enlaces de contacto en un sitio compacto y bilingüe.

Comenzó desde la [plantilla de portafolio de Magic UI Design](https://github.com/magicuidesign/portfolio), construida originalmente con Next.js, y la refactoricé a un sitio en Astro + React. Mantuve las piezas interactivas en React donde tenían sentido, añadí cambio de idioma entre español e inglés y moví la estructura de páginas, metadata, assets estáticos y build de producción hacia Astro.

## Sitio en Producción

La versión en producción está disponible en [pipeos.vercel.app](https://pipeos.vercel.app).

## Qué Muestra Este Proyecto

- Una migración desde una plantilla en Next.js hacia un portafolio estático en Astro.
- Una experiencia bilingüe con un selector de idioma propio que recuerda el idioma elegido.
- React islands para las partes que necesitan comportamiento en el cliente, como animaciones, toasts y tarjetas de proyectos.
- Contenido centralizado en `src/data/resume.tsx`, con copias en español e inglés cerca de los datos que describen.
- Un codebase pequeño y legible usando TypeScript, Tailwind CSS, Motion, primitivas Radix/shadcn y despliegue en Vercel.

## Stack

- Astro 6
- React 19
- TypeScript
- Tailwind CSS
- Componentes de Motion y Magic UI
- Primitivas UI estilo Radix/shadcn

## Estructura del Proyecto

```text
src/pages/index.astro        Ruta principal; renderiza la isla React del portafolio
src/layouts/Layout.astro     Metadata global, shell de página, estilos e islas persistentes
src/components/HomePage.tsx  Experiencia principal del portafolio y estado de idioma
src/components/section/      Secciones de proyectos, contacto y footer
src/components/ui/           Primitivas UI reutilizables e iconos SVG
src/data/resume.tsx          Contenido del portafolio, proyectos, habilidades, enlaces y traducciones
src/styles/global.css        Fuente de Tailwind v4, tokens, tipografía y estilos globales
public/                      Imágenes estáticas, archivos de CV e iconos
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

## Crédito de la Plantilla

El punto de partida original fue [magicuidesign/portfolio](https://github.com/magicuidesign/portfolio). Esta versión es mi propia refactorización y adaptación personal: Next.js fue reemplazado por Astro + React, el contenido fue reescrito para mi perfil y la estructura del proyecto fue ajustada para un portafolio estático desplegado en Vercel.
