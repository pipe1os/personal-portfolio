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
import { ArrowUpRight } from "lucide-react";
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
  "projects",
  "contributions",
  "education",
  "certifications",
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
      <span className="col-start-1 row-start-1">{format(shown)}</span>
    </span>
  );
}

/** Says the obvious thing a recruiter is looking for, and jumps to the contact section. */
function Availability({ label, delay }: { label: string; delay: number }) {
  return (
    <a
      href="#contact"
      className="rise meta inline-flex w-fit items-center gap-2 whitespace-nowrap text-paper"
      style={stagger(delay)}
    >
      <span className="relative flex size-2" aria-hidden>
        <span className="absolute inline-flex size-full rounded-full bg-signal opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex size-2 rounded-full bg-signal" />
      </span>
      <span className="link">{label}</span>
    </a>
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
    () =>
      SECTION_IDS.map((id, i) => ({
        id,
        n: String(i + 1).padStart(2, "0"),
        label: copy.sections[id],
      })),
    [copy],
  );
  const n = (id: (typeof SECTION_IDS)[number]) =>
    sections.find((s) => s.id === id)!.n;

  const [firstName, ...rest] = data.name.split(" ");
  const [proof, statement] = data.summary.trim().split(/\n\s*\n/);
  const firstSentenceEnd = statement.indexOf(". ") + 1;
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
          className="wrap flex min-h-[calc(100svh-var(--header-h))] flex-col pb-4 pt-6 md:pt-8"
        >
          <div className="grid-page relative">
            <DisplayName
              lines={[firstName, rest.join(" ")]}
              className="col-span-full row-start-1"
            />
            <figure
              className="wipe col-span-2 col-start-3 row-start-2 mt-8 overflow-hidden md:col-span-3 md:col-start-6 md:mt-10 lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:mt-0 lg:self-end"
              style={stagger(500)}
            >
              <img
                src={data.avatarUrl}
                alt={data.name}
                width={600}
                height={600}
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover grayscale contrast-[1.08]"
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
                {data.location}
                <br />
                36°49′S 73°03′W
              </p>
              <Availability label={copy.availability} delay={760} />
            </div>
          </div>

          <div className="grid-page mt-8 gap-y-8 md:mt-12 lg:mt-8">
            <div className="hidden flex-col gap-3 lg:col-span-4 lg:flex">
              <p
                className="rise text-[clamp(1.375rem,2.2vw,2.125rem)] font-medium leading-[1.05] tracking-[-0.025em] [font-variation-settings:'wdth'_106]"
                style={stagger(650)}
              >
                {role}
              </p>
              <p className="rise meta text-grey" style={stagger(720)}>
                {data.location}
              </p>
              <Availability label={copy.availability} delay={760} />
            </div>

            <ul className="col-span-4 border-t border-rule md:col-span-8 lg:col-span-6 lg:col-start-5">
              {copy.hero.facts.map((fact, i) => {
                const external = fact.href.startsWith("http");
                return (
                  <li key={fact.label} className="rise border-b border-rule" style={stagger(780 + i * 70)}>
                    <a
                      href={fact.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="sweep grid grid-cols-[minmax(6.25rem,auto)_1fr_auto] items-center gap-x-4 px-1 py-3 md:grid-cols-[8.5rem_1fr_auto]"
                    >
                      <span className="text-[clamp(1.5rem,2.1vw,2rem)] font-semibold leading-none tracking-[-0.03em] [font-variation-settings:'wdth'_112]">
                        <Tick
                          value={fact.figure.value === "merged" ? merged : fact.figure.value}
                          prefix={fact.figure.prefix}
                          suffix={fact.figure.suffix}
                          locale={language === "es" ? "es-CL" : "en-US"}
                          delay={780 + i * 70}
                        />
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <span className="meta sweep-muted text-grey">{fact.label}</span>
                        <span className="text-sm leading-snug">{fact.text}</span>
                      </span>
                      <ArrowUpRight className="sweep-arrow size-3.5" strokeWidth={1.5} aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>

            <ul className="order-first col-span-4 flex gap-6 md:col-span-8 lg:order-none lg:col-span-2 lg:col-start-11 lg:flex-col lg:gap-1.5 lg:pt-3">
              {social.map(([key, s], i) => {
                const external = s.url.startsWith("http");
                return (
                  <li key={key} className="rise" style={stagger(900 + i * 60)}>
                    <a
                      href={s.url}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="link meta inline-flex items-center gap-1 text-paper"
                    >
                      {copy.socialLabels[key as keyof typeof copy.socialLabels] ?? s.name}
                      <ArrowUpRight className="size-3" strokeWidth={1.5} aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label={copy.header.index} className="mt-auto pt-10 lg:pt-6">
            <ol className="grid-page">
              {sections.map((s, i) => (
                <li key={s.id} className="col-span-2 md:col-span-2 lg:col-span-2">
                  <div className="rule-draw h-px bg-rule" style={stagger(900 + i * 60)} />
                  <a
                    href={`#${s.id}`}
                    className="rise sweep flex items-baseline gap-3 px-1 py-3 md:py-4"
                    style={stagger(980 + i * 60)}
                  >
                    <span className="meta sweep-muted text-grey">{s.n}</span>
                    <span className="text-[0.9375rem] font-medium md:text-base">{s.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </section>

        <SectionFrame id="about" n={n("about")} title={copy.sections.about}>
          <p
            className="max-w-[24ch] text-[clamp(1.75rem,3.3vw,3.25rem)] font-medium leading-[1.04] tracking-[-0.03em] [font-variation-settings:'wdth'_104]"
            data-reveal="rise"
          >
            {statement.slice(0, firstSentenceEnd)}
            <span className="text-grey">{statement.slice(firstSentenceEnd)}</span>
          </p>
          <div className="mt-14 grid gap-x-(--gutter) gap-y-12 md:mt-20 md:grid-cols-9">
            <p
              className="max-w-[60ch] text-base leading-relaxed text-grey md:col-span-5 md:text-[1.0625rem]"
              data-reveal="rise"
            >
              {inlineLinks(proof)}
            </p>
            <div className="md:col-span-4 md:col-start-6" data-reveal="rise" style={stagger(80)}>
              <h3 className="meta mb-3 text-grey">{copy.about.tools}</h3>
              <ul className="grid grid-cols-2">
                {data.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="border-t border-rule py-3 pr-2 odd:border-r odd:pl-0 even:pl-4"
                  >
                    <span className="text-lg font-medium leading-tight tracking-[-0.01em]">
                      {skill.name}
                    </span>
                  </li>
                ))}
                {data.skills.length % 2 === 1 && (
                  <li aria-hidden className="border-t border-rule bg-paper/[0.03]" />
                )}
              </ul>
            </div>
          </div>
        </SectionFrame>

        <SectionFrame
          id="projects"
          n={n("projects")}
          title={copy.sections.projects}
          aside={<ProjectIndex projects={data.projects} label={copy.projects.index} />}
        >
          <ProjectsSection copy={copy.projects} projects={data.projects} />
        </SectionFrame>

        <SectionFrame
          id="contributions"
          n={n("contributions")}
          title={copy.sections.contributions}
        >
          <ContributionsSection
            copy={copy.contributions}
            contributions={data.openSourceContributions}
          />
        </SectionFrame>

        <SectionFrame id="education" n={n("education")} title={copy.sections.education} compact>
          <ol className="border-t border-rule">
            {data.education.map((e, i) => (
              <li key={e.school} className="border-b border-rule" data-reveal="rise" style={stagger(i * 60)}>
                <a
                  href={e.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sweep grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 px-1 py-5 md:grid-cols-9 md:items-baseline md:gap-x-(--gutter)"
                >
                  <span className="col-span-2 text-lg font-medium leading-snug md:col-span-4 md:col-start-3 md:row-start-1">
                    {e.school}
                  </span>
                  <span className="sweep-muted text-[0.9375rem] text-grey md:col-span-2 md:col-start-7 md:row-start-1">
                    {e.degree}
                  </span>
                  <span className="meta sweep-muted text-grey md:col-span-2 md:col-start-1 md:row-start-1 max-md:hidden">
                    {e.start}–{e.end}
                  </span>
                  <span className="meta sweep-muted flex items-center justify-end gap-2 text-grey md:col-span-1 md:col-start-9 md:row-start-1">
                    <span className="md:hidden">
                      {e.start}–{e.end}
                    </span>
                    <ArrowUpRight className="sweep-arrow size-3.5" strokeWidth={1.5} aria-hidden />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </SectionFrame>

        <SectionFrame
          id="certifications"
          n={n("certifications")}
          title={copy.sections.certifications}
          compact
        >
          <ol className="border-t border-rule">
            {data.certifications.map((cert, i) => (
              <li key={cert.title} className="border-b border-rule" data-reveal="rise" style={stagger(i * 60)}>
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sweep grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 px-1 py-5 md:grid-cols-9 md:items-baseline md:gap-x-(--gutter)"
                >
                  <span className="col-span-2 text-lg font-medium leading-snug md:col-span-4 md:col-start-3 md:row-start-1">
                    {cert.title}
                  </span>
                  <span className="sweep-muted text-[0.9375rem] text-grey md:col-span-2 md:col-start-7 md:row-start-1">
                    {cert.issuer}
                  </span>
                  <span className="meta sweep-muted text-grey md:col-span-2 md:col-start-1 md:row-start-1 max-md:hidden">
                    {cert.date}
                  </span>
                  <span className="meta sweep-muted flex items-center justify-end gap-2 text-grey md:col-span-1 md:col-start-9 md:row-start-1">
                    <span className="md:hidden">{cert.date}</span>
                    <ArrowUpRight className="sweep-arrow size-3.5" strokeWidth={1.5} aria-hidden />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </SectionFrame>

        <ContactSection copy={copy.contact} socialLabels={copy.socialLabels} />
      </main>
    </>
  );
}
