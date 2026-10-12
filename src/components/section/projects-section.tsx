import type { SiteCopy } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  description: string;
  dates: string;
  technologies: readonly string[];
  active?: boolean;
  href?: string;
  image?: string;
  links?: readonly { href: string; type: string }[];
};

/**
 * Plates alternate between a narrow image with its notes beside it and a
 * full-measure image with notes below, so consecutive projects never repeat
 * the same scale.
 */
export default function ProjectsSection({
  copy,
  projects,
}: {
  copy: SiteCopy["projects"];
  projects: readonly Project[];
}) {
  return (
    <>
      <p
        className="mb-14 max-w-[46ch] text-lg leading-snug text-paper md:mb-20 md:text-xl"
        data-reveal="rise"
      >
        {copy.description}
      </p>
      <div className="flex flex-col gap-24 md:gap-36">
        {projects.map((project, i) => {
          const split = i % 2 === 0;
          return (
            <article
              key={project.title}
              className="plate grid gap-x-(--gutter) md:grid-cols-9"
            >
              <div
                className="flex flex-col gap-2 md:col-span-9 md:flex-row md:items-baseline md:justify-between md:gap-8"
                data-reveal="rise"
              >
                <h3 className="max-w-[18ch] text-[clamp(1.75rem,3.4vw,3.25rem)] font-semibold leading-[0.95] tracking-[-0.035em] [font-variation-settings:'wdth'_110]">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:text-signal"
                  >
                    {project.title}
                  </a>
                </h3>
                <span className="meta shrink-0 text-grey">{project.dates}</span>
              </div>

              {project.image && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  aria-hidden="true"
                  className={cn(
                    "mt-6 block overflow-hidden bg-ink-2 md:mt-8",
                    split
                      ? "aspect-[5/3] md:col-span-6"
                      : "aspect-[16/9] md:col-span-9",
                  )}
                  data-reveal="wipe"
                >
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover object-top"
                  />
                </a>
              )}

              <div
                className={cn(
                  "mt-6 grid content-start gap-y-8 md:mt-8",
                  split
                    ? "md:col-span-3 md:col-start-7"
                    : "md:col-span-9 md:grid-cols-9 md:gap-x-(--gutter)",
                )}
                data-reveal="rise"
                style={{ "--d": "80ms" } as React.CSSProperties}
              >
                <p
                  className={cn(
                    "max-w-[62ch] text-[0.9375rem] leading-relaxed text-grey",
                    !split && "md:col-span-5 md:text-base",
                  )}
                >
                  {project.description}
                </p>
                <dl
                  className={cn(
                    "grid grid-cols-[5.5rem_1fr] content-start gap-y-3 border-t border-rule pt-4",
                    !split && "md:col-span-4 md:col-start-6 md:border-t-0 md:pt-0",
                  )}
                >
                  <dt className="meta text-grey">{copy.status}</dt>
                  <dd className="meta flex items-center gap-2 text-paper">
                    {project.active && (
                      <>
                        <span className="size-1.5 bg-signal" aria-hidden />
                        {copy.active}
                      </>
                    )}
                  </dd>
                  <dt className="meta text-grey">{copy.stack}</dt>
                  <dd className="meta text-paper">
                    {project.technologies.join(" / ")}
                  </dd>
                  <dt className="meta text-grey">{copy.links}</dt>
                  <dd className="flex flex-wrap gap-x-5 gap-y-1">
                    {project.links?.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link meta inline-flex items-center gap-1 text-paper"
                        aria-label={`${link.type}: ${project.title}`}
                      >
                        {link.type}
                        <ArrowUpRight className="size-3" strokeWidth={1.5} aria-hidden />
                      </a>
                    ))}
                  </dd>
                </dl>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
