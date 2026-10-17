import { cn } from "@/lib/utils";
import { LANGUAGES, type Language, type SiteCopy } from "@/data/resume";
import { useEffect, useState } from "react";

export type SectionLink = { id: string; n: string; label: string };

function LocalClock({ language, label }: { language: Language; label: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = new Intl.DateTimeFormat(language === "es" ? "es-CL" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "America/Santiago",
      timeZoneName: "shortOffset",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [language]);

  return (
    <span className="meta text-grey">
      <span className="sr-only">{label}: </span>
      <time aria-live="off">{time || "--:--:-- GMT-3"}</time>
    </span>
  );
}

export function SiteHeader({
  name,
  role,
  language,
  onLanguage,
  copy,
  sections,
  heroRef,
}: {
  name: string;
  role: string;
  language: Language;
  onLanguage: (language: Language) => void;
  copy: SiteCopy;
  sections: SectionLink[];
  heroRef: React.RefObject<HTMLElement | null>;
}) {
  const [past, setPast] = useState(false);
  const [active, setActive] = useState<SectionLink | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => {
      setPast(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [heroRef]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setActive(sections.find((s) => s.id === entry.target.id) ?? null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-ink">
      <div className="wrap">
        <div className="grid-page h-(--header-h) items-center">
          <a
            href="#top"
            className="col-span-3 overflow-hidden md:col-span-3 lg:col-span-3"
          >
            {!past && <span className="sr-only">{name}, </span>}
            {past ? (
              <span
                key="name"
                className="roll block truncate text-[0.95rem] font-bold tracking-[-0.01em] [font-variation-settings:'wdth'_80]"
              >
                {name}
              </span>
            ) : (
              <span key="role" className="roll block truncate">
                <span className="meta hidden text-grey md:inline">{role}</span>
                <span className="md:hidden">
                  <LocalClock language={language} label={copy.header.localTime} />
                </span>
              </span>
            )}
          </a>

          <div className="meta hidden gap-4 md:col-span-2 md:flex lg:col-span-4">
            <span className="hidden text-grey lg:inline">36°49′S 73°03′W</span>
            <LocalClock language={language} label={copy.header.localTime} />
          </div>

          <div className="hidden overflow-hidden md:col-span-2 md:block lg:col-span-3">
            {active && past && (
              <a
                href={`#${active.id}`}
                key={active.id}
                className="roll meta text-paper"
              >
                <span className="text-grey">{active.n} / 0{sections.length}</span>
                <span className="ml-3">{active.label}</span>
              </a>
            )}
          </div>

          <div
            role="group"
            aria-label={copy.language.label}
            className="meta col-span-1 flex items-center justify-end lg:col-span-2"
          >
            {LANGUAGES.map((option, i) => (
              <span key={option} className="flex items-center">
                {i > 0 && <span className="text-grey/50" aria-hidden>/</span>}
                <button
                  type="button"
                  aria-pressed={language === option}
                  lang={option}
                  onClick={() => onLanguage(option)}
                  className={cn(
                    "h-11 cursor-pointer px-2 uppercase transition-colors duration-200",
                    language === option
                      ? "text-paper underline decoration-signal decoration-2 underline-offset-[6px]"
                      : "text-grey hover:text-paper",
                  )}
                >
                  {copy.language.options[option]}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
