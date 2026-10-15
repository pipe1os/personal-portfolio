import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** One station on the page's vertical axis: drawn rule, pinned label left, content right. */
export function SectionFrame({
  id,
  n,
  title,
  compact,
  aside,
  children,
}: {
  id: string;
  n: string;
  title: string;
  /** Short lists get a shorter station so they don't read as empty bands. */
  compact?: boolean;
  /** Pinned under the label on wide screens, e.g. an index of the section. */
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="wrap">
      <div className="h-px bg-rule" data-reveal="rule" />
      <div
        className={cn(
          "grid-page pt-5 lg:pt-6",
          compact ? "pb-20 md:pb-24 lg:pb-28" : "pb-24 md:pb-32 lg:pb-44",
        )}
      >
        <div className="col-span-4 mb-12 md:col-span-8 lg:col-span-3 lg:mb-0">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <h2
              id={`${id}-title`}
              className="flex items-baseline gap-4 text-[clamp(1.75rem,2.4vw,2.5rem)] font-semibold leading-none tracking-[-0.03em] [font-variation-settings:'wdth'_108]"
              data-reveal="rise"
            >
              <span className="meta font-normal tracking-normal text-grey">{n}</span>
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
