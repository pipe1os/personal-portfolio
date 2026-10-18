import { DisplayName } from "@/components/display-name";
import { DATA, type SiteCopy } from "@/data/resume";
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ContactSection({
  copy,
  socialLabels,
}: {
  copy: SiteCopy["contact"];
  socialLabels: SiteCopy["socialLabels"];
}) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DATA.contact.email);
      setState("copied");
    } catch {
      setState("error");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2400);
  };

  const elsewhere = Object.entries(DATA.contact.social).filter(
    ([key]) => key !== "email",
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="on-signal relative bg-signal text-ink"
    >
      <div className="wrap pb-6 pt-16 md:pt-24 lg:pt-28">
        <DisplayName
          as="h2"
          id="contact-title"
          lines={[copy.heading]}
          reveal
          className="is-wide"
        />

        <div className="grid-page mt-12 gap-y-12 md:mt-16 lg:mt-20">
          <p
            className="col-span-4 max-w-[34ch] text-xl leading-snug md:col-span-4 lg:col-span-4 lg:text-[1.375rem]"
            data-reveal="rise"
          >
            {copy.description}
          </p>

          <div
            className="col-span-4 md:col-span-4 lg:col-span-7 lg:col-start-6"
            data-reveal="rise"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            <a
              href={`mailto:${DATA.contact.email}`}
              className="link block w-fit max-w-full break-all text-[clamp(1.5rem,3.34vw,3rem)] font-semibold leading-none tracking-[-0.035em] [font-variation-settings:'wdth'_104]"
            >
              {DATA.contact.email}
            </a>
            <div className="mt-5 flex items-center gap-4">
              <button
                type="button"
                onClick={copyEmail}
                data-state={state}
                className="btn [--btn-bg:var(--color-ink)] [--btn-hover-bg:var(--color-paper)] [--btn-hover-ink:var(--color-ink)] [--btn-ink:var(--color-paper)] [--nudge-y:0]"
              >
                {state === "copied" ? (
                  <Check className="btn-icon size-4" strokeWidth={2} aria-hidden />
                ) : (
                  <Copy className="btn-icon size-4" strokeWidth={1.75} aria-hidden />
                )}
                {state === "copied" ? copy.copied : copy.copy}
              </button>
              <span className="meta" role="status" aria-live="polite">
                {state === "copied"
                  ? copy.copySuccess
                  : state === "error"
                    ? copy.copyError
                    : ""}
              </span>
            </div>

            <ul className="mt-14 md:mt-16">
              {elsewhere.map(([key, social]) => (
                <li key={key}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sweep flex items-baseline justify-between gap-4 px-1 py-3.5 text-[clamp(1.25rem,1.53vw,1.375rem)] font-semibold tracking-[-0.02em] [--sweep-color:var(--color-ink)] [--sweep-ink:var(--color-signal)]"
                  >
                    {socialLabels[key as keyof typeof socialLabels] ?? social.name}
                    <span className="meta flex items-center gap-2 font-medium tracking-normal">
                      {social.url.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")}
                      <ArrowUpRight className="sweep-arrow size-3.5" strokeWidth={1.5} aria-hidden />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="meta mt-28 flex flex-wrap items-center justify-between gap-4 md:mt-40">
          <span>© {new Date().getFullYear()} {DATA.name}</span>
          <span className="hidden md:block">{DATA.location}</span>
          <a
            href="#top"
            className="group inline-flex h-11 items-center gap-2"
          >
            <span className="link">{copy.backToTop}</span>
            <ArrowUp
              className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5"
              strokeWidth={1.75}
              aria-hidden
            />
          </a>
        </footer>
      </div>
    </section>
  );
}
