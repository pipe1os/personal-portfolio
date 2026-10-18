import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** One station on the page's vertical axis: pinned label left, content right, space between stations. */
export function SectionFrame({
  id,
  title,
  compact,
  aside,
  children,
}: {
  id: string;
  title: string;
  /** Short lists get a shorter station so they don't read as empty bands. */
  compact?: boolean;
  /** Pinned under the label on wide screens, e.g. an index of the section. */
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="wrap">
      <div
        className={cn(
          "grid-page pt-16 md:pt-20 lg:pt-24",
          compact ? "pb-12 md:pb-16 lg:pb-20" : "pb-16 md:pb-24 lg:pb-32",
        )}
      >
        <div className="col-span-4 mb-10 md:col-span-8 lg:col-span-3 lg:mb-0">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <h2
              id={`${id}-title`}
              className="section-title text-[clamp(2.25rem,3.34vw,3rem)] font-semibold leading-[0.95] tracking-[-0.035em]"
              data-reveal="rise"
            >
              {title}
            </h2>
            {aside}
          </div>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}
