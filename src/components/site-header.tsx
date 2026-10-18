import { cn } from "@/lib/utils";
import { LANGUAGES, type Language, type SiteCopy } from "@/data/resume";
import { useEffect, useRef, useState } from "react";

export type SectionLink = { id: string; label: string };

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
  const [onSignal, setOnSignal] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Over the vermilion contact field, the bar takes the field's colour instead of cutting across it.
  useEffect(() => {
    const field = document.getElementById("contact");
    const bar = headerRef.current;
    if (!field || !bar) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setOnSignal(field.getBoundingClientRect().top <= bar.offsetHeight / 2);
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
  }, []);

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
    <header
      ref={headerRef}
      className="site-header sticky top-0 z-40 bg-ink"
      data-signal={onSignal || undefined}
    >
      <div className="wrap">
        <div className="grid-page h-(--header-h) items-center">
          <a href="#top" className="col-span-3 overflow-hidden md:col-span-3 lg:col-span-3">
            {!past && <span className="sr-only">{name}, </span>}
            {past ? (
              <span
                key="name"
                className="roll block truncate text-[0.9375rem] font-bold tracking-[-0.01em] [font-variation-settings:'wdth'_80]"
              >
                {name}
              </span>
            ) : (
              <span key="role" className="roll meta block truncate text-grey">
                {role}
              </span>
            )}
          </a>

          <div className="hidden overflow-hidden md:col-span-3 md:col-start-5 md:block lg:col-span-4 lg:col-start-6">
            {active && past && (
              <a
                href={`#${active.id}`}
                key={active.id}
                className="roll meta flex items-center gap-2.5 text-paper"
              >
                <span className="pipe pipe-in text-signal" aria-hidden />
                {active.label}
              </a>
            )}
          </div>

          <div
            role="group"
            aria-label={copy.language.label}
            className="meta col-span-1 flex items-center justify-end md:col-start-8 lg:col-span-2 lg:col-start-11"
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
                    "h-11 cursor-pointer px-2 transition-colors duration-200",
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
