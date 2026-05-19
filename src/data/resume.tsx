import { Icons } from "@/components/icons";
import { ReactDark } from "@/components/ui/svgs/reactDark";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Supabase } from "@/components/ui/svgs/supabase";
import { Git } from "@/components/ui/svgs/git";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Python } from "@/components/ui/svgs/python";
export const LANGUAGES = ["es", "en"] as const;
export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = "es";

const LOCALIZED_RESUME = {
  es: {
    location: "Concepción, Chile",
    description: "Desarrollador Frontend con experiencia en Next.js",
    summary: `
Desarrollador frontend con foco en Next.js. Comencé en Ingeniería Civil en Informática en la UCSC y después de dos años decidí cambiar a Duoc UC para enfocarme en desarrollo de software de forma más directa y práctica.

Mi proyecto principal es un portal de transparencia financiera para la FEUCSC, una aplicación real con usuarios reales, donde tomé decisiones técnicas que importaban: autenticación con RLS en Supabase, uploads server-side con validación de magic bytes, control de acceso en tres capas, etc.

Me importa escribir código que alguien más pueda leer y mantener. Aprendo construyendo cosas que tienen que funcionar de verdad, y me incomoda quedarme quieto cuando hay algo que mejorar.
    `,
  },
  en: {
    location: "Concepción, Chile",
    description: "Frontend Developer with experience in Next.js.",
    summary: `
Frontend developer focused on Next.js. I started in Computer Science at UCSC and after two years switched to Duoc UC to focus more directly on software development.

My main project is a financial transparency portal for the FEUCSC, a real app with real users, where the technical decisions actually mattered: Supabase auth with RLS, server-side uploads with magic byte validation, three-layer access control, etc.

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
    },
    projects: {
      label: "Proyectos",
      heading: "Revisa mi trabajo",
      description:
        "He trabajado en una variedad de proyectos, desde sitios web simples hasta aplicaciones web complejas.",
      openProject: "Abrir",
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
    },
    projects: {
      label: "Projects",
      heading: "Check out my work",
      description:
        "I have worked on a range of projects, from focused websites to complex web applications.",
      openProject: "Open",
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
        es: "Plataforma de transparencia financiera desarrollada para la FEUCSC que centraliza la gestión y auditoría de gastos federativos mediante una dashboard en tiempo real, autenticación segura y control de acceso basado en roles.",
        en: "Financial transparency platform developed for FEUCSC. It centralizes federation expense management and auditing through a real-time dashboard, secure authentication, and role-based access control.",
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
            es: "Fuente",
            en: "Source",
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
        es: "Portfolio personal enfocado en rendimiento y experiencia mobile-first. Proyecto refactorizado desde una base original en Next.js hacia Astro + React, incorporando arquitectura híbrida, soporte bilingüe, optimizaciones de rendimiento y personalización completa de interfaz.",
        en: "Personal portfolio focused on performance and mobile-first experience. Refactored from an original Next.js codebase to Astro + React, incorporating a hybrid architecture, bilingual support, performance optimizations, and full UI customization.",
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
            es: "Sitio",
            en: "Website",
          },
          href: "https://pipeos.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: {
            es: "Fuente",
            en: "Source",
          },
          href: "https://github.com/pipe1os",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/portfolio.webp",
      video: "",
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
  };
}
