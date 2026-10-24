import type { SiteCopy } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import {
  useEffect,
  useState,
  type ComponentType,
  type CSSProperties,
  type PointerEvent,
  type SVGProps,
} from "react";

type Project = {
  title: string;
  kind: string;
  tagline: string;
  description: string;
  dates: string;
  technologies: readonly string[];
  active?: boolean;
  /** Set beside the title while the thing isn't launched, e.g. "En desarrollo". */
  status?: string;
  /** Featured projects get the full measure; the rest pair up below them. */
  featured?: boolean;
  /** A wordmark drawn in place of the title text. */
  logo?: ComponentType<SVGProps<SVGSVGElement>>;
  href?: string;
  image?: string;
  links?: readonly { href: string; type: string }[];
};

type Copy = SiteCopy["projects"];

const anchor = (title: string) =>
  `project-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

const stagger = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Featured first, so the page and its index read in the same order. */
const byWeight = <T extends { featured?: boolean }>(projects: readonly T[]) => [
  ...projects.filter((p) => p.featured),
  ...projects.filter((p) => !p.featured),
];

/** "https://www.npmjs.com/package/shipdot/" -> "npmjs.com/package/shipdot" */
const shortUrl = (href: string) => {
  const url = new URL(href);
  return (url.host.replace(/^www\./, "") + url.pathname).replace(/\/$/, "");
};

/** The last project whose top has crossed the middle of the screen; -1 before the first. */
function useActiveProject(ids: string[]) {
  const [active, setActive] = useState(-1);
  const key = ids.join();

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id));
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      setActive(els.findLastIndex((el) => !!el && el.getBoundingClientRect().top < mid));
    };
    const schedule = () => {
      frame ||= requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key]);

  return active;
}

/** Pinned under the section label: where you are among the projects, and a way to jump. */
export function ProjectIndex({
  projects,
  label,
}: {
  projects: readonly Pick<Project, "title" | "kind" | "featured">[];
  label: string;
}) {
  const ordered = byWeight(projects);
  const ids = ordered.map((p) => anchor(p.title));
  const active = useActiveProject(ids);

  return (
    <nav
      aria-label={label}
      className="mt-12 hidden lg:block"
      data-reveal="rise"
      style={stagger(120)}
    >
      <div className="relative">
        <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-ink-3" />
        <span
          aria-hidden
          className="absolute left-0 top-0 h-14 w-[3px] bg-signal transition-[transform,opacity] duration-700 ease-out-expo"
          style={{
            transform: `translateY(${Math.max(active, 0) * 100}%)`,
            opacity: active < 0 ? 0 : 1,
          }}
        />
        <ol>
          {ordered.map((p, i) => (
            <li key={p.title}>
              <a
                href={`#${ids[i]}`}
                aria-current={i === active ? "location" : undefined}
                className={cn(
                  "flex h-14 flex-col justify-center gap-0.5 pl-5 transition-colors duration-300",
                  i === active ? "text-paper" : "text-grey hover:text-paper",
                )}
              >
                <span className="truncate text-[0.9375rem] font-medium leading-tight">
                  {p.title}
                </span>
                <span className="meta truncate">{p.kind}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

/** Kind and period: what the thing is and since when. */
function Kind({ project, copy }: { project: Project; copy: Copy }) {
  return (
    <p className="flex flex-col gap-1">
      <span className="text-[0.9375rem] font-medium text-paper">{project.kind}</span>
      <span className="meta flex items-center gap-2 text-grey">
        {project.active && (
          <>
            <span className="pipe text-signal" aria-hidden />
            <span className="sr-only">{copy.active}:</span>
          </>
        )}
        {project.dates}
      </span>
    </p>
  );
}

/** The screenshot. A label follows the pointer, colour comes in as it reaches the middle of the screen. */
function Media({ project, copy }: { project: Project; copy: Copy }) {
  const track = (e: PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      onPointerEnter={track}
      onPointerMove={track}
      className="plate-media relative mt-6 block aspect-video overflow-hidden bg-ink-2 md:mt-8"
      data-reveal="wipe"
      style={stagger(140)}
    >
      <div className="plate-zoom size-full">
        <img
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-top"
        />
      </div>
      <span className="plate-cursor meta flex items-center gap-1.5 bg-signal px-2.5 py-1.5 whitespace-nowrap text-ink">
        {copy.openProject} {project.href && shortUrl(project.href)}
        <ArrowUpRight className="size-3" strokeWidth={1.75} aria-hidden />
      </span>
    </a>
  );
}

/** Stack as separate words, then every link as a row that says where it goes. */
function Facts({
  project,
  copy,
  className,
}: {
  project: Project;
  copy: Copy;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div data-reveal="rise" style={stagger(220)}>
        <h4 className="meta mb-3 text-grey">{copy.stack}</h4>
        <ul className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li key={tech} className="meta bg-ink-3 px-2.5 py-1.5 text-paper">
              {tech}
            </li>
          ))}
        </ul>
      </div>
      {!!project.links?.length && (
        <ul>
          {project.links.map((link, i) => (
            <li
              key={link.href}
              data-reveal="rise"
              style={stagger(280 + i * 60)}
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.type}: ${project.title}`}
                className="sweep grid grid-cols-[4rem_minmax(0,1fr)_auto] items-baseline gap-x-4 px-1 py-2.5"
              >
                <span className="meta sweep-muted text-grey">{link.type}</span>
                <span className="truncate text-[0.9375rem] font-medium">{shortUrl(link.href)}</span>
                <ArrowUpRight
                  className="sweep-arrow size-3.5 self-center"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Name across the measure, story on the left five columns, facts on the right four. */
const SPLIT = {
  grid: "md:grid-cols-9",
  full: "md:col-span-9",
  left: "md:col-span-5",
  right: "md:col-span-4 md:col-start-6",
  end: "md:self-end",
};

const SPLIT_UNTIL_LG = {
  grid: "md:max-lg:grid-cols-9",
  full: "md:max-lg:col-span-9",
  left: "md:max-lg:col-span-5",
  right: "md:max-lg:col-span-4 md:max-lg:col-start-6",
  end: "md:max-lg:self-end",
};

/**
 * Every project reads in the same order: name, what it is, the picture, the story,
 * then stack and links. Featured plates always split it 5:4; paired plates stack it
 * once they sit side by side.
 */
function Plate({
  project,
  copy,
  featured,
  className,
}: {
  project: Project;
  copy: Copy;
  featured?: boolean;
  className?: string;
}) {
  const Logo = project.logo;
  const id = anchor(project.title);
  // Paired plates take the same 5:4 split while they still run the full measure.
  const split = featured ? SPLIT : SPLIT_UNTIL_LG;

  return (
    <article id={id} aria-labelledby={`${id}-title`} className={cn("plate", className)}>
      <header className={cn("grid gap-x-(--gutter) gap-y-4", split.grid)}>
        <h3
          id={`${id}-title`}
          className={cn(
            featured ? "text-[clamp(2.5rem,5vw,4.5rem)]" : "text-[clamp(2rem,3.34vw,3rem)]",
            split.full,
            // After the size, or tailwind-merge drops the leading.
            "font-semibold leading-[0.92] tracking-[-0.04em] [font-variation-settings:'wdth'_110]",
          )}
          data-reveal="rise"
        >
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-signal"
          >
            {Logo ? (
              <>
                {/* Sized so the ascenders meet the cap height and the baseline lines up with the text titles. */}
                <Logo aria-hidden className="inline h-[0.94em] w-auto align-[-0.23em]" />
                <span className="sr-only">{project.title}</span>
              </>
            ) : (
              project.title
            )}
          </a>
          {project.status && (
            <span className="ml-[0.3em] inline-flex -translate-y-[0.4em] items-center gap-2 bg-ink-3 px-2.5 py-1.5 align-middle text-[0.9375rem] font-medium leading-none tracking-normal whitespace-nowrap text-paper [font-variation-settings:normal]">
              <span className="caret text-signal" aria-hidden />
              {project.status}
            </span>
          )}
        </h3>
        <p
          className={cn(
            "max-w-[30ch] text-xl md:text-[1.375rem]",
            "font-medium leading-[1.15] tracking-[-0.02em] text-paper [font-variation-settings:'wdth'_104]",
            split.left,
          )}
          data-reveal="rise"
          style={stagger(70)}
        >
          {project.tagline}
        </p>
        <div className={cn(split.right, split.end)} data-reveal="rise" style={stagger(110)}>
          <Kind project={project} copy={copy} />
        </div>
      </header>

      {project.image && <Media project={project} copy={copy} />}

      <div className={cn("mt-6 grid gap-x-(--gutter) gap-y-10 md:mt-8", split.grid)}>
        <p
          className={cn(
            "max-w-[62ch] text-[1.0625rem]",
            "leading-relaxed text-paper",
            split.left,
          )}
          data-reveal="rise"
          style={stagger(180)}
        >
          {project.description}
        </p>
        <Facts project={project} copy={copy} className={split.right} />
      </div>
    </article>
  );
}

export default function ProjectsSection({
  copy,
  projects,
}: {
  copy: Copy;
  projects: readonly Project[];
}) {
  const featured = projects.filter((p) => p.featured);
  const rest = byWeight(projects).slice(featured.length);

  return (
    <>
      <p
        className="mb-16 max-w-[46ch] text-lg leading-snug text-paper md:mb-24 md:text-[1.375rem]"
        data-reveal="rise"
      >
        {copy.description}
      </p>
      <div className="flex flex-col gap-28 md:gap-40">
        {featured.map((project) => (
          <Plate key={project.title} project={project} copy={copy} featured />
        ))}
        {rest.length > 0 && (
          <div className="grid gap-y-28 lg:grid-cols-9 lg:gap-x-(--gutter)">
            {rest.map((project, i) => (
              <Plate
                key={project.title}
                project={project}
                copy={copy}
                className={cn(
                  "lg:col-span-4",
                  // The right-hand column drops, so the pair reads one after the other.
                  i % 2 === 1 && "lg:col-start-6 lg:mt-40",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
