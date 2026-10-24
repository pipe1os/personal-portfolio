import { Icons } from "@/components/icons";
import { Astro } from "@/components/ui/svgs/astro";
import { AstroOfficialLogo } from "@/components/ui/svgs/astro-official";
import { Cloudflare } from "@/components/ui/svgs/cloudflare";
import { Drizzle } from "@/components/ui/svgs/drizzle";
import { Firebase } from "@/components/ui/svgs/firebase";
import GeodeIcon from "@/components/ui/svgs/geode";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Python } from "@/components/ui/svgs/python";
import { ReactDark } from "@/components/ui/svgs/reactDark";
import { Shipdot } from "@/components/ui/svgs/shipdot";
import { Git } from "@/components/ui/svgs/git";
import { Turso } from "@/components/ui/svgs/turso";
import { Typescript } from "@/components/ui/svgs/typescript";
export const LANGUAGES = ["es", "en"] as const;
export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = "es";

const LOCALIZED_RESUME = {
  es: {
    location: "Concepción, Chile",
    languages: "Trabajo en español e inglés",
    description: "Desarrollador de Software · Full Stack",
    /** The lead is set large; the rest are paragraphs with `[label](href)` links. */
    profile: {
      lead: "Me importa escribir código que alguien más pueda leer y mantener.",
      body: [
        "Aprendo construyendo cosas que tienen que funcionar de verdad. Me incomoda ver algo que podría estar mejor y que nadie arregla.",
        "Mi proyecto más grande es [Centro de Estudio UBB](#projects), una plataforma académica para estudiantes de la Universidad del Bío-Bío que todavía está en desarrollo. Soy el desarrollador principal. Elegí Turso como base de datos principal y Firestore para lo que pasa en tiempo real, armé las reglas de seguridad por matrícula y la llevé a Android e iOS con Capacitor.",
        "También tengo [Kumo](https://kumoweb.cl), donde hago páginas y software a medida para pymes. En [open source](#contributions) me han fusionado PRs en Astro, tRPC y Strands Agents, el SDK de agentes de AWS.",
      ],
    },
  },
  en: {
    location: "Concepción, Chile",
    languages: "I work in Spanish and English",
    description: "Software Developer · Full Stack",
    profile: {
      lead: "I care about writing code that someone else can read and maintain.",
      body: [
        "I learn by building things that have to actually work. It bothers me to see something that could be better and that nobody fixes.",
        "My biggest project is [Centro de Estudio UBB](#projects), an academic platform for students at the Universidad del Bío-Bío that is still in development. I'm the main developer. I chose Turso as the main database and Firestore for everything real-time, wrote the enrollment-based security rules, and took it to Android and iOS with Capacitor.",
        "I also run [Kumo](https://kumoweb.cl), where I build websites and custom software for small businesses. In [open source](#contributions), I've had PRs merged into Astro, tRPC, and Strands Agents, AWS's agent SDK.",
      ],
    },
  },
} as const;

export const SITE_COPY = {
  es: {
    seo: {
      title: "Felipe Arce · Desarrollador Full Stack en Concepción, Chile",
      description:
        "Desarrollador full stack en Concepción, Chile. Next.js, TypeScript, React y Python. Dirijo Kumo y tengo PRs fusionados en Astro, tRPC y Strands Agents.",
      jobTitle: "Desarrollador Full Stack",
      locale: "es_CL",
      ogImage: "/og-es.png",
      ogAlt: "Felipe Arce, desarrollador full stack en Concepción, Chile",
    },
    language: {
      label: "Cambiar idioma",
      options: {
        es: "ES",
        en: "EN",
      },
    },
    header: {
      index: "Índice",
    },
    availability: "Disponible ahora",
    hero: {
      action: "Hablemos",
      facts: [
        {
          figure: { value: 292, prefix: "", suffix: "" },
          text: "Commits como desarrollador principal de Centro de Estudio UBB, una plataforma web, Android e iOS que todavía está en desarrollo",
          href: "#project-centro-de-estudio-ubb",
        },
        {
          figure: { value: "merged", prefix: "", suffix: "" },
          text: "PRs fusionados en open source, entre ellos Astro, tRPC y Strands Agents, el SDK de agentes de AWS",
          href: "#contributions",
        },
        {
          figure: { value: 2, prefix: "", suffix: "" },
          text: "Paquetes publicados: shipdot en npm y modelinfo-cli en PyPI",
          href: "#project-shipdot",
        },
      ],
    },
    sections: {
      about: "Perfil",
      experience: "Experiencia",
      projects: "Proyectos",
      contributions: "Código abierto",
      education: "Formación",
      contact: "Contacto",
    },
    education: {
      degrees: "Carreras",
      certifications: "Certificaciones",
    },
    about: {
      tools: "Herramientas",
    },
    projects: {
      description:
        "Una plataforma académica, mi emprendimiento y dos herramientas open source publicadas en npm y PyPI.",
      index: "Índice de proyectos",
      kind: "Tipo",
      period: "Periodo",
      stack: "Stack",
      active: "Activo",
      openProject: "Abrir",
    },
    contributions: {
      description: "PRs que he mandado a proyectos open source.",
      summary: {
        merged: "fusionados",
        open: "abiertos",
        draft: "en borrador",
      },
      status: {
        open: "Abierto",
        merged: "Fusionado",
        draft: "Borrador",
      },
      expandAll: "Expandir todo",
      collapseAll: "Contraer todo",
    },
    contact: {
      heading: "Hablemos.",
      description: [
        "Busco trabajo como desarrollador full stack: full-time o part-time, remoto o en Concepción, y puedo empezar ya. Trabajo en español e inglés.",
        "Kumo lo sigo en paralelo. Lo que quiero es entrar a un equipo donde aprenda de gente con más experiencia que yo. Si tienes algo, escríbeme y te respondo rápido.",
      ],
      copy: "Copiar",
      copied: "Copiado",
      copySuccess: "Correo copiado al portapapeles",
      copyError: "No se pudo copiar. Escribe a la dirección directamente.",
      backToTop: "Volver arriba",
    },
    socialLabels: {
      GitHub: "GitHub",
      LinkedIn: "LinkedIn",
      email: "Correo",
    },
  },
  en: {
    seo: {
      title: "Felipe Arce · Full Stack Developer in Concepción, Chile",
      description:
        "Full stack developer in Concepción, Chile. Next.js, TypeScript, React and Python. I run Kumo and have PRs merged into Astro, tRPC and Strands Agents.",
      jobTitle: "Full Stack Developer",
      locale: "en_US",
      ogImage: "/og-en.png",
      ogAlt: "Felipe Arce, full stack developer in Concepción, Chile",
    },
    language: {
      label: "Change language",
      options: {
        es: "ES",
        en: "EN",
      },
    },
    header: {
      index: "Index",
    },
    availability: "Available now",
    hero: {
      action: "Let's talk",
      facts: [
        {
          figure: { value: 292, prefix: "", suffix: "" },
          text: "Commits as main developer of Centro de Estudio UBB, a web, Android and iOS platform that is still in development",
          href: "#project-centro-de-estudio-ubb",
        },
        {
          figure: { value: "merged", prefix: "", suffix: "" },
          text: "PRs merged in open source, including Astro, tRPC and Strands Agents, AWS's agent SDK",
          href: "#contributions",
        },
        {
          figure: { value: 2, prefix: "", suffix: "" },
          text: "Packages published: shipdot on npm and modelinfo-cli on PyPI",
          href: "#project-shipdot",
        },
      ],
    },
    sections: {
      about: "Profile",
      experience: "Experience",
      projects: "Projects",
      contributions: "Open source",
      education: "Education",
      contact: "Contact",
    },
    education: {
      degrees: "Degrees",
      certifications: "Certifications",
    },
    about: {
      tools: "Tools",
    },
    projects: {
      description:
        "An academic platform, my business, and two open-source tools published on npm and PyPI.",
      index: "Project index",
      kind: "Type",
      period: "Period",
      stack: "Stack",
      active: "Active",
      openProject: "Open",
    },
    contributions: {
      description: "PRs I've sent to open-source projects.",
      summary: {
        merged: "merged",
        open: "open",
        draft: "draft",
      },
      status: {
        open: "Open",
        merged: "Merged",
        draft: "Draft",
      },
      expandAll: "Expand all",
      collapseAll: "Collapse all",
    },
    contact: {
      heading: "Let's talk.",
      description: [
        "I'm looking for a full stack developer role: full-time or part-time, remote or in Concepción, and I can start now. I work in Spanish and English.",
        "I'll keep running Kumo on the side. What I want is to join a team where I can learn from people with more experience than me. If you have something, email me and I'll get back to you quickly.",
      ],
      copy: "Copy",
      copied: "Copied",
      copySuccess: "Email copied to clipboard",
      copyError: "Could not copy. Write to the address directly.",
      backToTop: "Back to top",
    },
    socialLabels: {
      GitHub: "GitHub",
      LinkedIn: "LinkedIn",
      email: "Email",
    },
  },
} as const;

export type SiteCopy = (typeof SITE_COPY)[Language];

export const DATA = {
  name: "Felipe Arce",
  fullName: "Felipe Arce Aqueveque",
  initials: "FA",
  url: "https://www.pipeos.dev",
  location: LOCALIZED_RESUME.es.location,
  locationLink: "https://www.google.com/maps/place/concepcion",
  description: LOCALIZED_RESUME.es.description,
  avatarUrl: "/me.webp",
  skills: [
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Typescript", icon: Typescript },
    { name: "React", icon: ReactDark },
    { name: "Astro", icon: Astro },
    { name: "Python", icon: Python },
    { name: "Turso", icon: Turso },
    { name: "Drizzle", icon: Drizzle },
    { name: "Firebase", icon: Firebase },
    { name: "Cloudflare", icon: Cloudflare },
    { name: "Git", icon: Git },
  ],
  contact: {
    email: "felipearce.2004@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/pipe1os",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/pipeos/",
        icon: Icons.linkedin,

        navbar: true,
      },
      email: {
        name: "Email",
        url: "mailto:felipearce.2004@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  education: [
    {
      school: "INACAP",
      href: "https://www.inacap.cl",
      degree: {
        es: "Analista Programador · ingreso en marzo de 2027",
        en: "Programmer Analyst · starting in March 2027",
      },
      logoUrl: "/inacap.svg",
      years: "2027",
    },
    {
      school: "UCSC (Universidad Católica de la Santísima Concepción)",
      href: "https://ucsc.cl",
      degree: {
        es: "Ingeniería Civil en Informática · 2 años cursados",
        en: "Computer Engineering · 2 years completed",
      },
      logoUrl: "/ucsc.webp",
      years: "2024–2026",
    },
  ],
  experience: [
    {
      role: {
        es: "Desarrollador principal",
        en: "Main developer",
      },
      org: "Centro de Estudio UBB",
      href: "https://ceoubb.com",
      dates: {
        es: "Ago 2026 – Presente",
        en: "Aug 2026 – Present",
      },
      description: {
        es: "Diseño y desarrollo la plataforma web y las apps móviles. Todavía no está lanzada.",
        en: "I design and build the web platform and the mobile apps. It hasn't launched yet.",
      },
    },
    {
      role: {
        es: "Fundador y desarrollador",
        en: "Founder and developer",
      },
      org: "Kumo",
      href: "https://kumoweb.cl",
      dates: {
        es: "Sep 2026 – Presente",
        en: "Sep 2026 – Present",
      },
      description: {
        es: "Páginas y sistemas a medida para pymes de Chile, con precio cerrado.",
        en: "Websites and custom systems for small businesses in Chile, at a fixed price.",
      },
    },
  ],
  projects: [
    {
      title: {
        es: "Centro de Estudio UBB",
        en: "Centro de Estudio UBB",
      },
      href: "https://ceoubb.com",
      dates: {
        es: "Ago 2026 – Presente",
        en: "Aug 2026 – Present",
      },
      active: true,
      featured: true,
      status: {
        es: "En desarrollo",
        en: "In development",
      },
      kind: {
        es: "Plataforma web y móvil · desarrollador principal",
        en: "Web and mobile platform · main developer",
      },
      tagline: {
        es: "Una alternativa a Moodle hecha por estudiantes de la Universidad del Bío-Bío.",
        en: "An alternative to Moodle built by students at the Universidad del Bío-Bío.",
      },
      description: {
        es: "Es una plataforma académica independiente, pensada como reemplazo de Moodle y Adecca. Tiene aulas organizadas por resultados de aprendizaje, una libreta de notas de 1,0 a 7,0 que te calcula la nota que te falta para aprobar, planificador semanal, mensajería por ramo e importación de cursos desde Moodle (.mbz). Usa Turso con Drizzle como base principal y Firestore en la región de Santiago para el tiempo real. Las apps Android e iOS están hechas con Capacitor y tienen notificaciones push.",
        en: "It's an independent academic platform, built to replace Moodle and Adecca. It has classrooms organized by learning outcomes, a gradebook on the 1.0 to 7.0 scale that works out the grade you still need to pass, a weekly planner, per-course messaging, and course import from Moodle (.mbz). It uses Turso with Drizzle as the main database and Firestore in the Santiago region for real time. The Android and iOS apps are built with Capacitor and have push notifications.",
      },
      technologies: [
        "Next.js",
        "Typescript",
        "Turso",
        "Drizzle",
        "Firebase",
        "Capacitor",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: {
            es: "Sitio",
            en: "Website",
          },
          href: "https://ceoubb.com",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: {
            es: "Repo",
            en: "Repo",
          },
          href: "https://github.com/CEOUBB/CEOUBB",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/ceoubb.webp",
      video: "",
    },
    {
      title: {
        es: "Kumo",
        en: "Kumo",
      },
      href: "https://kumoweb.cl",
      dates: {
        es: "Sep 2026 – Presente",
        en: "Sep 2026 – Present",
      },
      active: true,
      featured: true,
      kind: {
        es: "Emprendimiento",
        en: "Business",
      },
      tagline: {
        es: "Páginas y software a medida para pymes de todo Chile.",
        en: "Websites and custom software for small businesses across Chile.",
      },
      description: {
        es: "Kumo hace páginas y software para pymes, locales y emprendedores: landings que entrego en 48 a 72 horas, sitios con catálogo y SEO, cartas digitales con pedidos online sin comisión y sistemas internos de inventario, ventas o agenda. Cobro un precio cerrado, en un solo pago.",
        en: "Kumo builds websites and software for small businesses, shops and entrepreneurs: landing pages I deliver in 48 to 72 hours, catalog sites with SEO, digital menus with commission-free online ordering, and internal systems for inventory, sales or scheduling. I charge a fixed price, in a single payment.",
      },
      technologies: ["Astro", "Cloudflare"],
      links: [
        {
          type: {
            es: "Sitio",
            en: "Website",
          },
          href: "https://kumoweb.cl",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/kumo.webp",
      video: "",
    },
    {
      title: {
        es: "shipdot",
        en: "shipdot",
      },
      logo: Shipdot,
      href: "https://pipe1os.github.io/shipdot/",
      dates: {
        es: "Oct 2026 – Presente",
        en: "Oct 2026 – Present",
      },
      active: true,
      kind: {
        es: "Paquete npm",
        en: "npm package",
      },
      tagline: {
        es: "Un changelog dentro de tu app, redactado desde tus pull requests.",
        en: "An in-app changelog drafted from your merged pull requests.",
      },
      description: {
        es: "Changelog dentro de la app y hotspots de funciones, open source, como alternativa a Beamer y Headway. Las novedades son archivos Markdown en el repositorio: la CLI las redacta a partir de los pull requests fusionados (con plantillas sin conexión o con tu propia clave de Anthropic o de una API compatible con OpenAI) y una GitHub Action abre cada semana un PR con los borradores para revisarlos como código. El widget es un web component de <10 KB, sin dependencias y con Shadow DOM, que muestra una campana con contador de no leídos y pone un punto pulsante sobre el botón exacto donde vive cada función nueva. Sin backend, cuentas ni rastreo, con soporte multilenguaje y contraste WCAG 2.1 AA.",
        en: "An open-source in-app changelog with feature hotspots, built as an alternative to Beamer and Headway. Updates are Markdown files in the repo: the CLI drafts them from merged pull requests (with offline templates or your own Anthropic or OpenAI-compatible key) and a GitHub Action opens a weekly PR with the drafts so they get reviewed like code. The widget is a <10 KB, zero-dependency, Shadow DOM web component that shows a bell with an unread count and puts a pulsing dot on the exact button where each new feature lives. No backend, accounts, or tracking, with multi-language support and WCAG 2.1 AA contrast.",
      },
      technologies: ["Typescript", "Web Components", "GitHub Actions", "npm"],
      links: [
        {
          type: {
            es: "Docs",
            en: "Docs",
          },
          href: "https://pipe1os.github.io/shipdot/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: {
            es: "Repo",
            en: "Repo",
          },
          href: "https://github.com/pipe1os/shipdot",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: {
            es: "npm",
            en: "npm",
          },
          href: "https://www.npmjs.com/package/shipdot",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/shipdot.webp",
      video: "",
    },
    {
      title: {
        es: "ModelInfo CLI",
        en: "ModelInfo CLI",
      },
      href: "https://pypi.org/project/modelinfo-cli/",
      dates: {
        es: "Mayo 2026",
        en: "May 2026",
      },
      active: true,
      kind: {
        es: "Paquete PyPI",
        en: "PyPI package",
      },
      tagline: {
        es: "Inspecciona modelos de ML en milisegundos, sin instalar PyTorch.",
        en: "Inspect ML model checkpoints in milliseconds, without PyTorch.",
      },
      description: {
        es: "Una herramienta CLI liviana para inspeccionar checkpoints de ML (.safetensors, .gguf, .pt), ya sea en disco o directo desde el Hugging Face Hub. Lee los headers binarios directamente, sin cargar PyTorch ni Transformers, así que los archivos locales se parsean en menos de 100ms. Te dice cuánta VRAM necesita un modelo según la cuantización y el largo de contexto, cómo se reparte entre varias GPUs contando el overhead de NCCL, y cuántos tokens caben en el KV cache de vLLM.",
        en: "A lightweight CLI for inspecting ML checkpoints (.safetensors, .gguf, .pt), on disk or straight from the Hugging Face Hub. It reads the binary headers directly instead of loading PyTorch or Transformers, so local files parse in under 100ms. It tells you how much VRAM a model needs at a given quantization and context length, how that splits across multiple GPUs once NCCL overhead is counted, and how many tokens fit in vLLM’s KV cache.",
      },
      technologies: ["Python", "CLI", "PyPI", "Machine Learning"],
      links: [
        {
          type: {
            es: "Repo",
            en: "Repo",
          },
          href: "https://github.com/pipe1os/modelinfo-cli",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: {
            es: "PyPI",
            en: "PyPI",
          },
          href: "https://pypi.org/project/modelinfo-cli/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/modelinfo-cli.webp",
      video: "",
    },
  ],
  openSourceContributions: [
    {
      repo: "boykopovar/AnyPS5",
      title: {
        es: "feat(libSceLibcInternal): implement fdopendir",
        en: "feat(libSceLibcInternal): implement fdopendir",
      },
      dates: {
        es: "Oct 2026",
        en: "Oct 2026",
      },
      status: "merged",
      href: "https://github.com/boykopovar/AnyPS5/pull/4569",
      icon: (
        <img
          src="https://avatars.githubusercontent.com/u/184076081?v=4"
          alt="AnyPS5 logo"
          className="size-5 rounded-full"
        />
      ),
    },
    {
      repo: "boykopovar/AnyPS5",
      title: {
        es: "fix(agc): render into non-resident packed mip tails",
        en: "fix(agc): render into non-resident packed mip tails",
      },
      dates: {
        es: "Oct 2026",
        en: "Oct 2026",
      },
      status: "merged",
      href: "https://github.com/boykopovar/AnyPS5/pull/4328",
      icon: (
        <img
          src="https://avatars.githubusercontent.com/u/184076081?v=4"
          alt="AnyPS5 logo"
          className="size-5 rounded-full"
        />
      ),
    },
    {
      repo: "boykopovar/AnyPS5",
      title: {
        es: "fix(agc): keep another device's host imports until its teardown",
        en: "fix(agc): keep another device's host imports until its teardown",
      },
      dates: {
        es: "Oct 2026",
        en: "Oct 2026",
      },
      status: "merged",
      href: "https://github.com/boykopovar/AnyPS5/pull/3976",
      icon: (
        <img
          src="https://avatars.githubusercontent.com/u/184076081?v=4"
          alt="AnyPS5 logo"
          className="size-5 rounded-full"
        />
      ),
    },
    {
      repo: "boykopovar/AnyPS5",
      title: {
        es: "feat(libkernel): support EVFILT_READ on the read end of a pipe",
        en: "feat(libkernel): support EVFILT_READ on the read end of a pipe",
      },
      dates: {
        es: "Oct 2026",
        en: "Oct 2026",
      },
      status: "merged",
      href: "https://github.com/boykopovar/AnyPS5/pull/5973",
      icon: (
        <img
          src="https://avatars.githubusercontent.com/u/184076081?v=4"
          alt="AnyPS5 logo"
          className="size-5 rounded-full"
        />
      ),
    },
    {
      repo: "boykopovar/AnyPS5",
      title: {
        es: "feat: run the common-dialog state machine in the Facebook and game custom data dialogs",
        en: "feat: run the common-dialog state machine in the Facebook and game custom data dialogs",
      },
      dates: {
        es: "Oct 2026",
        en: "Oct 2026",
      },
      status: "merged",
      href: "https://github.com/boykopovar/AnyPS5/pull/10022",
      icon: (
        <img
          src="https://avatars.githubusercontent.com/u/184076081?v=4"
          alt="AnyPS5 logo"
          className="size-5 rounded-full"
        />
      ),
    },
    {
      repo: "trpc/trpc",
      title: {
        es: "fix(server): clear the sse maxDurationMs timer when the subscription ends",
        en: "fix(server): clear the sse maxDurationMs timer when the subscription ends",
      },
      dates: {
        es: "Oct 2026",
        en: "Oct 2026",
      },
      status: "merged",
      href: "https://github.com/trpc/trpc/pull/7666",
      icon: (
        <img
          src="https://avatars.githubusercontent.com/u/78011399?v=4"
          alt="tRPC logo"
          className="size-5 rounded-full"
        />
      ),
    },
    {
      repo: "strands-agents/sdk-python",
      title: {
        es: "fix: prevent in-place mutation of message history in normalizer",
        en: "fix: prevent in-place mutation of message history in normalizer",
      },
      dates: {
        es: "May 2026",
        en: "May 2026",
      },
      status: "merged",
      href: "https://github.com/strands-agents/sdk-python/pull/2326",
      icon: (
        <img
          src="https://avatars.githubusercontent.com/u/209155962?s=200&v=4"
          alt="Strands logo"
          className="size-5 rounded-full"
        />
      ),
    },
    {
      repo: "withastro/astro",
      title: {
        es: "fix(transitions): stop Back from leaving the site in Chrome and Edge on iOS",
        en: "fix(transitions): stop Back from leaving the site in Chrome and Edge on iOS",
      },
      dates: {
        es: "Oct 2026",
        en: "Oct 2026",
      },
      status: "open",
      href: "https://github.com/withastro/astro/pull/18408",
      icon: <AstroOfficialLogo className="h-5 w-auto" />,
    },
    {
      repo: "withastro/astro",
      title: {
        es: "fix(core): cache resolved actions in base pipeline",
        en: "fix(core): cache resolved actions in base pipeline",
      },
      dates: {
        es: "May 2026",
        en: "May 2026",
      },
      status: "merged",
      href: "https://github.com/withastro/astro/pull/16859",
      icon: <AstroOfficialLogo className="h-5 w-auto" />,
    },
    {
      repo: "geode-sdk/geode",
      title: {
        es: "Fix windows startup freeze when geode fails to load",
        en: "Fix windows startup freeze when geode fails to load",
      },
      dates: {
        es: "May 2026",
        en: "May 2026",
      },
      status: "open",
      href: "https://github.com/geode-sdk/geode/pull/2082",
      icon: <GeodeIcon className="size-5" />,
    },
  ],
  certifications: [
    {
      title: "Engineer AI Agents with Agent Development Kit (ADK)",
      issuer: "Google",
      date: {
        es: "Mayo 2026",
        en: "May 2026",
      },
      logoUrl: "",
      href: "https://www.credly.com/badges/02eb26e9-bacc-4b7d-abb4-c4b79c22f2e4/public_url",
    },
    {
      title: "The Basics of Google Cloud Compute",
      issuer: "Google",
      date: {
        es: "Mayo 2026",
        en: "May 2026",
      },
      logoUrl: "",
      href: "https://www.credly.com/badges/e1a1b120-57dc-45ec-9a14-dfd6b6ca4fe6/public_url",
    },

  ],
} as const;

export function getResumeData(language: Language = DEFAULT_LANGUAGE) {
  const localized = LOCALIZED_RESUME[language];

  return {
    ...DATA,
    ...localized,
    education: DATA.education.map((education) => ({
      ...education,
      degree: education.degree[language],
    })),
    experience: DATA.experience.map((job) => ({
      ...job,
      role: job.role[language],
      dates: job.dates[language],
      description: job.description[language],
    })),
    projects: DATA.projects.map((project) => ({
      ...project,
      title: project.title[language],
      dates: project.dates[language],
      kind: project.kind[language],
      tagline: project.tagline[language],
      description: project.description[language],
      status: "status" in project ? project.status[language] : undefined,
      links: project.links.map((link) => ({
        ...link,
        type: link.type[language],
      })),
    })),
    openSourceContributions: DATA.openSourceContributions.map((contribution) => ({
      ...contribution,
      title: contribution.title[language],
      dates: contribution.dates[language],
      statusLabel: SITE_COPY[language].contributions.status[contribution.status],
    })),
    certifications: DATA.certifications.map((cert) => ({
      ...cert,
      date: cert.date[language],
    })),
  };
}
