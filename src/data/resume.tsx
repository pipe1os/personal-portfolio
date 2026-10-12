import { Icons } from "@/components/icons";
import { AstroOfficialLogo } from "@/components/ui/svgs/astro-official";
import GeodeIcon from "@/components/ui/svgs/geode";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Python } from "@/components/ui/svgs/python";
import { ReactDark } from "@/components/ui/svgs/reactDark";
import { Supabase } from "@/components/ui/svgs/supabase";
import { Git } from "@/components/ui/svgs/git";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Typescript } from "@/components/ui/svgs/typescript";
export const LANGUAGES = ["es", "en"] as const;
export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = "es";

const LOCALIZED_RESUME = {
  es: {
    location: "Concepción, Chile",
    description: "Desarrollador de Software · Full Stack",
    summary: `
Dirijo [Kumo](https://kumoweb.cl), mi emprendimiento de desarrollo web: páginas y software a medida para pymes de todo Chile. Mi proyecto más grande es [Centro de Estudio UBB](#projects), una plataforma académica para la comunidad de la Universidad del Bío-Bío donde las decisiones técnicas realmente importan: Turso como sistema de registro, Firestore para el tiempo real, reglas de seguridad por matrícula y apps móviles con Capacitor. También he [contribuido a proyectos de código abierto](#contributions), incluyendo astro, next.js y la documentación en español de python.

Me importa escribir código que alguien más pueda leer y mantener. Aprendo construyendo cosas que tienen que funcionar de verdad, y me incomoda cuando hay algo que podría estar mejor y nadie lo está arreglando.
    `,
  },
  en: {
    location: "Concepción, Chile",
    description: "Software Developer · Full Stack",
    summary: `
I run [Kumo](https://kumoweb.cl), my web development business: websites and custom software for small businesses across Chile. My biggest project is [Centro de Estudio UBB](#projects), an academic platform for the Universidad del Bío-Bío community where the technical decisions actually matter: Turso as the system of record, Firestore for real-time state, enrollment-based security rules, and mobile apps with Capacitor. I have also [contributed to open-source projects](#contributions), including astro, next.js, and python spanish docs.

I care about writing code that someone else can read and maintain. I learn by building things that have to actually work, and I get uncomfortable when there's something that could be better and nobody's fixing it.`,
  },
} as const;

export const SITE_COPY = {
  es: {
    language: {
      label: "Cambiar idioma",
      options: {
        es: "ES",
        en: "EN",
      },
    },
    header: {
      localTime: "Hora local en Concepción",
      index: "Índice",
    },
    hero: {
      facts: [
        {
          label: "Kumo",
          figure: { value: 72, prefix: "", suffix: " h" },
          text: "mi emprendimiento: páginas web para pymes de todo Chile, en línea en 48 a 72 horas",
          href: "https://kumoweb.cl",
        },
        {
          label: "Open source",
          figure: { value: "merged", prefix: "", suffix: "" },
          text: "PRs aceptados en Astro, strands-agents y AnyPS5",
          href: "#contributions",
        },
        {
          label: "PyPI",
          figure: { value: 100, prefix: "<", suffix: " ms" },
          text: "modelinfo-cli lee checkpoints de modelos de ML",
          href: "https://pypi.org/project/modelinfo-cli/",
        },
      ],
    },
    sections: {
      about: "Perfil",
      projects: "Proyectos",
      contributions: "Código abierto",
      education: "Formación",
      certifications: "Certificaciones",
      contact: "Contacto",
    },
    about: {
      tools: "Herramientas",
    },
    projects: {
      description:
        "Una mezcla de aplicaciones web, herramientas CLI y contribuciones.",
      stack: "Stack",
      links: "Enlaces",
      status: "Estado",
      active: "Activo",
      openProject: "Abrir",
    },
    contributions: {
      description: "Mis contribuciones a proyectos open-source.",
      summary: "{merged} aceptados · {open} abiertos · {draft} en borrador",
      status: {
        open: "Abierto",
        merged: "Aceptado",
        draft: "Borrador",
      },
    },
    contact: {
      heading: "Hablemos.",
      description:
        "Si tienes un proyecto en mente o una propuesta, escríbeme. Te responderé a la brevedad.",
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
    language: {
      label: "Change language",
      options: {
        es: "ES",
        en: "EN",
      },
    },
    header: {
      localTime: "Local time in Concepción",
      index: "Index",
    },
    hero: {
      facts: [
        {
          label: "Kumo",
          figure: { value: 72, prefix: "", suffix: " h" },
          text: "my business: websites for small businesses across Chile, live in 48 to 72 hours",
          href: "https://kumoweb.cl",
        },
        {
          label: "Open source",
          figure: { value: "merged", prefix: "", suffix: "" },
          text: "PRs merged into Astro, strands-agents and AnyPS5",
          href: "#contributions",
        },
        {
          label: "PyPI",
          figure: { value: 100, prefix: "<", suffix: " ms" },
          text: "modelinfo-cli reads ML model checkpoints",
          href: "https://pypi.org/project/modelinfo-cli/",
        },
      ],
    },
    sections: {
      about: "Profile",
      projects: "Projects",
      contributions: "Open source",
      education: "Education",
      certifications: "Certifications",
      contact: "Contact",
    },
    about: {
      tools: "Tools",
    },
    projects: {
      description:
        "A mix of web applications, CLI tools, and open source work.",
      stack: "Stack",
      links: "Links",
      status: "Status",
      active: "Active",
      openProject: "Open",
    },
    contributions: {
      description: "My contributions to open-source projects.",
      summary: "{merged} merged · {open} open · {draft} draft",
      status: {
        open: "Open",
        merged: "Merged",
        draft: "Draft",
      },
    },
    contact: {
      heading: "Let's talk.",
      description:
        "If you have a project in mind, a proposal, or just want to connect, send me a message. I will reply as soon as I can.",
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
  initials: "FA",
  url: "https://pipeos.vercel.app",
  location: LOCALIZED_RESUME.es.location,
  locationLink: "https://www.google.com/maps/place/concepcion",
  description: LOCALIZED_RESUME.es.description,
  summary: LOCALIZED_RESUME.es.summary,
  avatarUrl: "/me.webp",
  skills: [
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Typescript", icon: Typescript },
    { name: "React", icon: ReactDark },
    { name: "Supabase", icon: Supabase },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Python", icon: Python },
    { name: "Git", icon: Git },
  ],
  contact: {
    email: "felipearce.2004@gmail.com",
    tel: "+56935893317",
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
        es: "Analista Programador",
        en: "Programmer Analyst",
      },
      logoUrl: "/inacap.svg",
      start: {
        es: "2027",
        en: "2027",
      },
      end: {
        es: "2029",
        en: "2029",
      },
    },
    {
      school: "UCSC (Universidad Católica de la Santísima Concepción)",
      href: "https://ucsc.cl",
      degree: {
        es: "Ingeniería Civil en Informática",
        en: "Computer Science",
      },
      logoUrl: "/ucsc.webp",
      start: {
        es: "2024",
        en: "2024",
      },
      end: {
        es: "2026",
        en: "2026",
      },
    },
  ],
  projects: [
    {
      title: {
        es: "Kumo",
        en: "Kumo",
      },
      href: "https://kumoweb.cl",
      dates: {
        es: "2026 - Presente",
        en: "2026 - Present",
      },
      active: true,
      description: {
        es: "Mi emprendimiento de desarrollo web. Kumo hace páginas y software a medida para pymes, locales y emprendedores de todo Chile: landings listas en 48 a 72 horas, sitios con catálogo y SEO, cartas digitales con pedidos online sin comisión y sistemas internos de inventario, ventas y agenda. Precio cerrado y pago único, sin mensualidades.",
        en: "My web development business. Kumo builds websites and custom software for small businesses across Chile: landing pages live in 48 to 72 hours, catalog sites with SEO, digital menus with commission-free online ordering, and internal systems for inventory, sales, and scheduling. Fixed price, one-time payment, no subscriptions.",
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
        es: "Centro de Estudio UBB",
        en: "Centro de Estudio UBB",
      },
      href: "https://ceoubb.com",
      dates: {
        es: "Ago 2026 - Presente",
        en: "Aug 2026 - Present",
      },
      active: true,
      description: {
        es: "Plataforma académica estudiantil e independiente para la comunidad de la Universidad del Bío-Bío, pensada como alternativa moderna a Moodle y Adecca. Aulas virtuales organizadas por resultados de aprendizaje, libreta de notas en escala 1.0 a 7.0 con cálculo de nota mínima, planificador semanal, mensajería por asignatura e importación de cursos desde respaldos de Moodle (.mbz). Turso con Drizzle como sistema de registro y Firestore en Santiago para el estado en tiempo real, con apps Android e iOS vía Capacitor y notificaciones push.",
        en: "An independent, student-built academic platform for the Universidad del Bío-Bío community, designed as a modern alternative to Moodle and Adecca. Virtual classrooms organized by learning outcomes, a gradebook on Chile's 1.0 to 7.0 scale with minimum-passing-grade math, a weekly planner, per-course messaging, and course import from Moodle backups (.mbz). Turso with Drizzle as the system of record and Firestore in Santiago for real-time state, with Android and iOS apps via Capacitor and push notifications.",
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
        es: "ModelInfo CLI",
        en: "ModelInfo CLI",
      },
      href: "https://pypi.org/project/modelinfo-cli/",
      dates: {
        es: "Mayo 2026",
        en: "May 2026",
      },
      active: true,
      description: {
        es: "Una herramienta CLI sin dependencias que inspecciona checkpoints de modelos de ML (.safetensors, .gguf, .pt) de forma local o directamente desde el Hugging Face Hub. Al omitir PyTorch y Transformers, parsea los headers binarios locales en menos de 100ms. Calcula el footprint de VRAM considerando los multiplicadores de cuantización y las longitudes de contexto, y estima las penalizaciones NCCL en configuraciones multi-GPU y la capacidad de serving de vLLM para planificar despliegues en producción.",
        en: "A zero-dependency CLI tool that inspects ML model checkpoints (.safetensors, .gguf, .pt) locally or directly via the Hugging Face Hub. By bypassing PyTorch and Transformers, it parses local binary headers in under 100ms. It calculates VRAM footprints by factoring in quantization multipliers and context lengths, and calculates multi-GPU NCCL penalties and vLLM serving capacity for production deployment planning.",
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
    {
      repo: "python/python-docs-es",
      title: {
        es: "Complete translation of tutorial/classes.po",
        en: "Complete translation of tutorial/classes.po",
      },
      dates: {
        es: "May 2026",
        en: "May 2026",
      },
      status: "open",
      href: "https://github.com/python/python-docs-es/pull/3862",
      icon: <Python className="size-5" />,
    },
    {
      repo: "vercel/next.js",
      title: {
        es: "fix(devtools): detect VSCodium on macOS in launch-editor",
        en: "fix(devtools): detect VSCodium on macOS in launch-editor",
      },
      dates: {
        es: "May 2026",
        en: "May 2026",
      },
      status: "draft",
      href: "https://github.com/vercel/next.js/pull/94078",
      icon: <NextjsIconDark className="size-5" />,
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
      start: education.start[language],
      end: education.end[language],
    })),
    projects: DATA.projects.map((project) => ({
      ...project,
      title: project.title[language],
      dates: project.dates[language],
      description: project.description[language],
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
