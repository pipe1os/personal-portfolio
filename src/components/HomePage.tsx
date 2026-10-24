import { DisplayName } from "@/components/display-name";
import { SiteHeader, type SectionLink } from "@/components/site-header";
import ContactSection from "@/components/section/contact-section";
import ContributionsSection from "@/components/section/contributions-section";
import ProjectsSection, { ProjectIndex } from "@/components/section/projects-section";
import { SectionFrame } from "@/components/section/section-frame";
import {
  DATA,
  DEFAULT_LANGUAGE,
  getResumeData,
  SITE_COPY,
  type Language,
} from "@/data/resume";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

const SECTION_IDS = [
  "about",
  "experience",
  "projects",
  "contributions",
  "education",
  "contact",
] as const;

/** Renders the summary's `[label](href)` links; the copy uses nothing else. */
function inlineLinks(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    const external = m?.[2].startsWith("http");
    return m ? (
      <a
        key={i}
        href={m[2]}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="link text-paper"
      >
        {m[1]}
      </a>
    ) : (
      part
    );
  });
}

/** Arms scroll reveals once; anything already on screen is shown without animating. */
function useReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.in = "";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    for (const el of els) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.dataset.in = "";
      else io.observe(el);
    }
    document.documentElement.classList.add("reveal-armed");
    return () => io.disconnect();
  }, []);
}

const stagger = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** A figure that counts up once, in step with its row's entrance. The final value reserves the width. */
function Tick({
  value,
  prefix,
  suffix,
  locale,
  delay,
}: {
  value: number;
  prefix: string;
  suffix: string;
  locale: string;
  delay: number;
}) {
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now() + delay;
    const step = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / 1400));
      setShown(Math.round(value * (1 - Math.pow(1 - p, 4))));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  const format = (n: number) => `${prefix}${n.toLocaleString(locale)}${suffix}`;
  return (
    <span className="inline-grid tabular-nums">
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {format(value)}
      </span>
      <span className="col-start-1 row-start-1" aria-hidden>
        {format(shown)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}

/** The one thing to do on the first screen, beside the claim it answers. */
function HeroAction({
  action,
  availability,
  delay,
}: {
  action: string;
  availability: string;
  delay: number;
}) {
  return (
    <div className="rise mt-3 flex flex-wrap items-center gap-x-5 gap-y-3" style={stagger(delay)}>
      <a href="#contact" className="btn">
        {action}
        <ArrowDown className="btn-icon size-4" strokeWidth={2} aria-hidden />
      </a>
      <p className="meta flex items-center gap-2.5 whitespace-nowrap text-paper">
        <span className="pipe pipe-in text-signal" style={stagger(delay + 350)} aria-hidden />
        {availability}
      </p>
    </div>
  );
}

type LineUpRow = { key: string; href: string; when: string; title: string; detail: string };

/** A list set at one size: the column starts do the organising, not lines. */
function LineUp({ heading, rows, delay = 0 }: { heading: string; rows: LineUpRow[]; delay?: number }) {
  const size = "text-[clamp(1.125rem,1.53vw,1.375rem)] leading-snug";
  return (
    <div>
      <h3
        className={`mb-2 flex items-center gap-3 px-1 font-semibold tracking-[-0.015em] ${size}`}
        data-reveal="rise"
        style={stagger(delay)}
      >
        <span className="pipe text-signal" aria-hidden />
        {heading}
      </h3>
      <ol>
        {rows.map((row, i) => (
          <li key={row.key} data-reveal="rise" style={stagger(delay + 60 + i * 60)}>
            <a
              href={row.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`sweep grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 px-1 py-3 md:grid-cols-9 md:items-baseline md:gap-x-(--gutter) ${size}`}
            >
              <span className="col-span-2 font-medium tracking-[-0.015em] md:col-span-4 md:col-start-3 md:row-start-1">
                {row.title}
              </span>
              <span className="sweep-muted text-[0.9375rem] text-grey md:col-span-3 md:col-start-7 md:row-start-1 md:pr-10 md:text-[length:inherit]">
                {row.detail}
              </span>
              <span className="sweep-muted flex items-center justify-end gap-3 text-[0.9375rem] tabular-nums text-grey md:contents md:text-[length:inherit]">
                <span className="md:col-span-2 md:col-start-1 md:row-start-1">{row.when}</span>
                <ArrowUpRight
                  className="sweep-arrow size-4 shrink-0 md:col-start-9 md:row-start-1 md:justify-self-end md:self-center"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

type Job = { role: string; org: string; href: string; dates: string; description: string };

/** Roles still running: each row opens the place, and its caret keeps blinking after "present". */
function Experience({ jobs }: { jobs: Job[] }) {
  return (
    <ol className="-mx-1 flex flex-col">
      {jobs.map((job, i) => (
        <li key={job.org}>
          <a
            href={job.href}
            target="_blank"
            rel="noopener noreferrer"
            className="job group grid gap-x-(--gutter) gap-y-3 px-1 py-8 md:grid-cols-9 md:px-5 md:py-10"
          >
            {/* Role first in the source, so on a phone the dates follow it instead of sitting above as a label. */}
            <div
              className="md:col-span-4 md:col-start-3 md:row-start-1"
              data-reveal="rise"
              style={stagger(i * 120 + 70)}
            >
              <h3 className="text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[0.95] tracking-[-0.035em] [font-variation-settings:'wdth'_106]">
                {job.role}
              </h3>
              <p className="mt-3 flex items-center gap-1.5 text-xl font-medium tracking-[-0.02em] text-grey transition-colors duration-300 group-hover:text-paper md:text-[1.375rem]">
                {job.org}
                <ArrowUpRight
                  className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </p>
            </div>
            <p
              className="meta flex items-center gap-2.5 self-start text-grey md:col-span-2 md:col-start-1 md:row-start-1 md:pt-3"
              data-reveal="rise"
              style={stagger(i * 120)}
            >
              <span className="caret text-signal" aria-hidden />
              {job.dates}
            </p>
            <p
              className="max-w-[40ch] text-[1.0625rem] leading-relaxed md:col-span-3 md:col-start-7 md:row-start-1 md:pt-2"
              data-reveal="rise"
              style={stagger(i * 120 + 140)}
            >
              {job.description}
            </p>
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Each language lives at its own URL (/ and /en/), so links and search results open the right one. */
const pathFor = (language: Language) => (language === DEFAULT_LANGUAGE ? "/" : `/${language}/`);

export default function HomePage({
  initialLanguage = DEFAULT_LANGUAGE,
}: {
  initialLanguage?: Language;
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const data = getResumeData(language);
  const copy = SITE_COPY[language];
  const heroRef = useRef<HTMLElement>(null);

  useReveal();

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = SITE_COPY[language].seo.title;
    const path = pathFor(language);
    if (window.location.pathname !== path) {
      history.replaceState(history.state, "", path + window.location.hash);
    }
  }, [language]);

  const switchLanguage = (next: Language) => {
    if (next === language) return;
    const apply = () => flushSync(() => setLanguage(next));
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !calm) document.startViewTransition(apply);
    else apply();
  };

  const sections: SectionLink[] = useMemo(
    () => SECTION_IDS.map((id) => ({ id, label: copy.sections[id] })),
    [copy],
  );

  const [firstName, ...rest] = data.name.split(" ");
  const place = `${data.location} · ${data.languages}`;
  const role = data.description.split(" · ").flatMap((part, i) => (i ? [<br key={i} />, part] : [part]));
  const merged = data.openSourceContributions.filter((c) => c.status === "merged").length;
  const social = Object.entries(DATA.contact.social);

  return (
    <>
      <SiteHeader
        name={data.name}
        role={data.description}
        language={language}
        onLanguage={switchLanguage}
        copy={copy}
        sections={sections}
        heroRef={heroRef}
      />

      <main id="top">
        {/* Hero: the poster. */}
        <section
          ref={heroRef}
          aria-label={data.name}
          className="wrap flex min-h-[calc(100svh-var(--header-h))] flex-col pb-4 pt-4 md:pt-6"
        >
          <div className="grid-page relative">
            <DisplayName
              lines={[firstName, rest.join(" ")]}
              className="col-span-full row-start-1"
            />
            <figure
              className="portrait wipe col-span-2 col-start-3 row-start-2 mt-8 overflow-hidden bg-ink-2 md:col-span-3 md:col-start-6 md:mt-10 lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:mt-0 lg:self-end"
              style={stagger(500)}
            >
              <img
                src={data.avatarUrl}
                alt={data.name}
                width={600}
                height={600}
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover"
              />
            </figure>
            <div className="col-span-2 col-start-1 row-start-2 mt-8 flex flex-col justify-end gap-3 md:col-span-5 md:mt-10 lg:hidden">
              <p
                className="rise text-lg font-medium leading-tight tracking-[-0.02em] [font-variation-settings:'wdth'_106] md:text-[1.75rem] md:leading-[1.05]"
                style={stagger(650)}
              >
                {role}
              </p>
              <p className="rise meta text-grey" style={stagger(720)}>
                {place}
              </p>
              <HeroAction action={copy.hero.action} availability={copy.availability} delay={780} />
            </div>
          </div>

          <div className="grid-page mt-10 gap-y-8 md:mt-12 lg:mt-10">
            <div className="hidden flex-col gap-3 lg:col-span-4 lg:flex">
              <p
                className="rise text-[clamp(1.375rem,2.5vw,2.25rem)] font-medium leading-[1.05] tracking-[-0.03em] [font-variation-settings:'wdth'_98]"
                style={stagger(650)}
              >
                {role}
              </p>
              <p className="rise meta text-grey" style={stagger(720)}>
                {place}
              </p>
              <HeroAction action={copy.hero.action} availability={copy.availability} delay={780} />
            </div>

            {/* Three numbers that each prove one line of the summary. */}
            <ul className="col-span-4 grid md:col-span-8 md:grid-cols-3 md:gap-x-(--gutter) lg:col-span-6 lg:col-start-5">
              {copy.hero.facts.map((fact, i) => {
                const external = fact.href.startsWith("http");
                return (
                  <li key={fact.href} className="rise" style={stagger(820 + i * 80)}>
                    <a
                      href={fact.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="sweep grid h-full grid-cols-[7.5rem_1fr_auto] items-center gap-x-4 px-1 py-3 md:grid-cols-[1fr_auto] md:content-start md:items-start md:gap-y-3"
                    >
                      <span className="whitespace-nowrap text-[clamp(1.625rem,2.5vw,2.25rem)] font-semibold leading-[0.9] tracking-[-0.035em] [font-variation-settings:'wdth'_108] md:col-start-1 md:row-start-1">
                        <Tick
                          value={fact.figure.value === "merged" ? merged : fact.figure.value}
                          prefix={fact.figure.prefix}
                          suffix={fact.figure.suffix}
                          locale={language === "es" ? "es-CL" : "en-US"}
                          delay={820 + i * 80}
                        />
                      </span>
                      <span className="text-[0.9375rem] leading-snug md:col-span-2 md:row-start-2">
                        {fact.text}
                      </span>
                      <ArrowUpRight
                        className="sweep-arrow size-4 md:col-start-2 md:row-start-1"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <ul className="col-span-4 flex gap-6 md:col-span-8 lg:col-span-2 lg:col-start-11 lg:flex-col lg:gap-2 lg:pt-3">
              {social.map(([key, s], i) => {
                const external = s.url.startsWith("http");
                return (
                  <li key={key} className="rise" style={stagger(980 + i * 60)}>
                    <a
                      href={s.url}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="link group inline-flex items-center gap-1 text-[0.9375rem] font-medium text-paper"
                    >
                      {copy.socialLabels[key as keyof typeof copy.socialLabels] ?? s.name}
                      <ArrowUpRight
                        className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* The index reads like a shell pipeline: Perfil | Proyectos | … */}
          <nav aria-label={copy.header.index} className="mt-auto pt-12 lg:pt-10">
            <ol className="grid-page">
              {sections.map((s, i) => (
                <li key={s.id} className="col-span-2">
                  <a
                    href={`#${s.id}`}
                    className="pipe-link rise flex items-center gap-3 py-3 text-[0.9375rem] font-medium"
                    style={stagger(1040 + i * 60)}
                  >
                    <span className="pipe pipe-in" style={stagger(1180 + i * 60)} aria-hidden />
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </section>

        <SectionFrame id="about" title={copy.sections.about}>
          <p
            className="max-w-[26ch] text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.025em] [font-variation-settings:'wdth'_104]"
            data-reveal="rise"
          >
            {data.profile.lead}
          </p>
          <div className="mt-12 grid gap-x-(--gutter) gap-y-14 md:mt-16 md:grid-cols-9">
            <div
              className="flex max-w-[62ch] flex-col gap-5 text-[1.0625rem] leading-relaxed md:col-span-5"
              data-reveal="rise"
              style={stagger(60)}
            >
              {data.profile.body.map((paragraph) => (
                <p key={paragraph}>{inlineLinks(paragraph)}</p>
              ))}
            </div>
            <div className="md:col-span-4 md:col-start-6" data-reveal="rise" style={stagger(140)}>
              <h3 className="meta mb-3 text-grey">{copy.about.tools}</h3>
              <ul className="grid grid-cols-2 gap-x-(--gutter)">
                {data.skills.map(({ name, icon: Icon }) => (
                  <li key={name} className="skill flex items-center gap-3 py-2.5">
                    <Icon aria-hidden className="size-5 shrink-0" />
                    <span className="text-lg font-medium leading-tight tracking-[-0.015em] md:text-[1.375rem]">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionFrame>

        <SectionFrame id="experience" title={copy.sections.experience} compact>
          <Experience jobs={data.experience} />
        </SectionFrame>

        <SectionFrame
          id="projects"
          title={copy.sections.projects}
          aside={<ProjectIndex projects={data.projects} label={copy.projects.index} />}
        >
          <ProjectsSection copy={copy.projects} projects={data.projects} />
        </SectionFrame>

        <SectionFrame id="contributions" title={copy.sections.contributions}>
          <ContributionsSection
            copy={copy.contributions}
            contributions={data.openSourceContributions}
          />
        </SectionFrame>

        <SectionFrame id="education" title={copy.sections.education} compact>
          <div className="flex flex-col gap-14 md:gap-16">
            <LineUp
              heading={copy.education.degrees}
              rows={data.education.map((e) => ({
                key: e.school,
                href: e.href,
                when: e.years,
                title: e.school,
                detail: e.degree,
              }))}
            />
            <LineUp
              heading={copy.education.certifications}
              rows={data.certifications.map((c) => ({
                key: c.title,
                href: c.href,
                when: c.date,
                title: c.title,
                detail: c.issuer,
              }))}
            />
          </div>
        </SectionFrame>

        <ContactSection copy={copy.contact} socialLabels={copy.socialLabels} />
      </main>
    </>
  );
}
