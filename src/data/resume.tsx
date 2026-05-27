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
[Mi proyecto principal](#projects) es un portal de transparencia financiera para la FEUCSC, una aplicación real con usuarios reales, donde las decisiones técnicas realmente importaron: autenticación con RLS en Supabase, uploads server-side con validación de magic bytes, control de acceso en tres capas, etc. También he [contribuido a proyectos de código abierto](#contributions), incluyendo astro, next.js y la documentación en español de python.

Me importa escribir código que alguien más pueda leer y mantener. Aprendo construyendo cosas que tienen que funcionar de verdad, y me incomoda cuando hay algo que podría estar mejor y nadie lo está arreglando.
    `,
  },
  en: {
    location: "Concepción, Chile",
    description: "Software Developer · Full Stack",
    summary: `
[My main project](#projects) is a financial transparency portal for the FEUCSC, a real app with real users, where the technical decisions actually mattered: Supabase auth with RLS, server-side uploads with magic byte validation, three-layer access control, etc. I have also [contributed to open-source projects](#contributions), including astro, next.js, and python spanish docs.

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
    hero: {
      greeting: "Hola! soy",
    },
    sections: {
      about: "Acerca de mí",
      education: "Educación",
      skills: "Habilidades",
      certifications: "Certificaciones",
    },
    projects: {
      label: "Proyectos",
      heading: "Revisa mi trabajo",
      description:
        "Estos son mis proyectos principales, he construido desde sitios web simples hasta aplicaciones web complejas.",
      openProject: "Abrir",
    },
    contributions: {
      heading: "Contribuciones",
      description:
        "Mis contribuciones a proyectos open-source.",
      status: {
        open: "Open",
        merged: "Merged",
        draft: "Draft",
      },
    },
    contact: {
      label: "Contacto",
      heading: "Hablemos",
      description:
        "Si tienes un proyecto en mente o una propuesta, escríbeme. Te responderé a la brevedad.",
      copySuccess: "Correo copiado al portapapeles",
      copyError: "No se pudo copiar el correo",
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
    hero: {
      greeting: "Hi! I'm",
    },
    sections: {
      about: "About me",
      education: "Education",
      skills: "Skills",
      certifications: "Certifications",
    },
    projects: {
      label: "Projects",
      heading: "Check out my work",
      description:
        "These are my main projects, from focused websites to complex web applications.",
      openProject: "Open",
    },
    contributions: {
      heading: "Contributions",
      description:
        "My contributions to open-source projects.",
      status: {
        open: "Open",
        merged: "Merged",
        draft: "Draft",
      },
    },
    contact: {
      label: "Contact",
      heading: "Let's talk",
      description:
        "If you have a project in mind, a proposal, or just want to connect, send me a message. I will reply as soon as I can.",
      copySuccess: "Email copied to clipboard",
      copyError: "Could not copy email",
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
    {
      school: "Duoc UC",
      href: "https://duoc.cl",
      degree: {
        es: "Ingeniería en Informática",
        en: "Computer Engineering",
      },
      logoUrl: "/duocuc.webp",
      start: {
        es: "2026",
        en: "2026",
      },
      end: {
        es: "En Curso",
        en: "In Progress",
      },
    },
  ],
  projects: [
    {
      title: {
        es: "Portal de Gestión y Transparencia Financiera",
        en: "Financial Management and Transparency Portal",
      },
      href: "https://feucsc.vercel.app",
      dates: {
        es: "Ene 2026 - Presente",
        en: "Jan 2026 - Present",
      },
      active: true,
      description: {
        es: "Plataforma de transparencia financiera construida para la FEUCSC, una federación estudiantil de 14.000+ alumnos. Antes de esto, la gestión de gastos se hacía en papel y hojas de cálculo. La app centraliza el seguimiento de gastos, auditoría e informes con un dashboard en tiempo real, tres capas de seguridad independientes, uploads con validación de magic bytes y RLS en Supabase. En uso activo hoy.",
        en: "Financial transparency platform built for FEUCSC, the student federation of UCSC, a university of 14,000+ students. Before this, expense management ran on paper and spreadsheets. The app centralizes expense tracking, auditing, and reporting with a real-time dashboard, secured with three independent defensive layers, magic byte file validation, and Supabase RLS. Actively in use today.",
      },
      technologies: [
        "Next.js",
        "Typescript",
        "Supabase",
        "PostgreSQL",
        "Cloudinary",
        "Tailwind CSS",
        "HeroUI",
        "Motion",
        "Recharts",
        "Vercel",
        "Vitest",
      ],
      links: [
        {
          type: {
            es: "Sitio",
            en: "Website",
          },
          href: "https://feucsc.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: {
            es: "Repo",
            en: "Repo",
          },
          href: "https://github.com/pipe1os/FEUCSC-FINANZAS",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/feucsc.webp",
      video: "",
    },
    {
      title: {
        es: "Portfolio Web Personal",
        en: "Personal Web Portfolio",
      },
      href: "https://pipeos.vercel.app",
      dates: {
        es: "Abr 2026",
        en: "Apr 2026",
      },
      active: true,
      description: {
        es: `Refactorizado desde Next.js hacia Astro + React para adaptarse a un sitio estático con contenido pesado. La arquitectura de islas de Astro no envía JS por defecto, hidratando solo los componentes React que necesitan interactividad. Esto permite una carga más rápida y separa el contenido estático de la interfaz dinámica.`,
        en: `Refactored from Next.js to Astro + React to fit a content-heavy static site. Astro's island architecture ships zero JS by default, only hydrating React components that need interactivity. This transition reduced load times and separated static content from dynamic UI.`,
      },
      technologies: [
        "Astro",
        "React",
        "Typescript",
        "Tailwind CSS",
        "Shadcn UI",
        "Motion",
        "Vercel",
      ],
      links: [
        {
          type: {
            es: "Repo",
            en: "Repo",
          },
          href: "https://github.com/pipe1os/personal-portfolio",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/portfolio.webp",
      video: "",
    },
  ],
  openSourceContributions: [
    {
      repo: "withastro/astro",
      title: {
        es: "fix(actions): Fix array element coercion in actions",
        en: "fix(actions): Fix array element coercion in actions",
      },
      dates: {
        es: "May 2026",
        en: "May 2026",
      },
      status: "open",
      href: "https://github.com/withastro/astro/pull/16876",
      icon: <AstroOfficialLogo className="h-5 w-auto" />,
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
      status: "open",
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
    {
      title: "B1 English for Developers",
      issuer: "freeCodeCamp",
      date: {
        es: "Mayo 2026",
        en: "May 2026",
      },
      logoUrl: "",
      href: "https://freecodecamp.org/certification/fcc0437f77a-3e45-45af-8662-6ba55413b498/b1-english-for-developers",
    },
    {
      title: "Frontend Developer (React) Certificate",
      issuer: "HackerRank",
      date: {
        es: "Mayo 2026",
        en: "May 2026",
      },
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      href: "https://www.hackerrank.com/certificates/a0b1611a7b51",
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
