import type { SiteCopy } from "@/data/resume";
import {
  PrStatusIcon,
  type ContributionStatus,
} from "@/components/ui/svgs/pr-status";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

type Contribution = {
  title: string;
  repo: string;
  dates: string;
  status: ContributionStatus;
  statusLabel: string;
  href: string;
};

export default function ContributionsSection({
  copy,
  contributions,
}: {
  copy: SiteCopy["contributions"];
  contributions: Contribution[];
}) {
  const count = (status: ContributionStatus) =>
    contributions.filter((c) => c.status === status).length;
  const summary = copy.summary
    .replace("{merged}", String(count("merged")))
    .replace("{open}", String(count("open")))
    .replace("{draft}", String(count("draft")));

  return (
    <>
      <div className="mb-10 flex flex-col gap-2 md:mb-14" data-reveal="rise">
        <p className="max-w-[46ch] text-lg leading-snug text-paper md:text-xl">
          {copy.description}
        </p>
        <p className="meta text-grey">{summary}</p>
      </div>
      <ol className="border-t border-rule">
        {contributions.map((c, i) => (
          <li
            key={c.href}
            className="border-b border-rule"
            data-reveal="rise"
            style={{ "--d": `${Math.min(i, 6) * 45}ms` } as CSSProperties}
          >
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sweep group grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 px-1 py-4 md:grid-cols-9 md:items-baseline md:gap-x-(--gutter) md:py-5"
            >
              <span className="col-span-2 text-base font-medium leading-snug md:col-span-4 md:col-start-3 md:row-start-1 md:text-[1.0625rem]">
                {c.title}
              </span>
              <span className="meta sweep-muted flex min-w-0 items-baseline gap-2 text-grey md:col-span-2 md:col-start-1 md:row-start-1">
                <PrStatusIcon
                  status={c.status}
                  className="sweep-muted size-3.5 shrink-0 translate-y-[3px]"
                />
                <span>{c.statusLabel}</span>
                <span className="truncate md:hidden">· {c.repo}</span>
              </span>
              <span className="meta sweep-muted hidden truncate text-grey md:col-span-2 md:col-start-7 md:row-start-1 md:block">
                {c.repo}
              </span>
              <span className="meta sweep-muted flex items-center justify-end gap-2 whitespace-nowrap text-grey md:col-span-1 md:col-start-9 md:row-start-1">
                {c.dates}
                <ArrowUpRight
                  className="sweep-arrow size-3.5"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </span>
            </a>
          </li>
        ))}
      </ol>
    </>
  );
}
