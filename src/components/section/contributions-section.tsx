import type { SiteCopy } from "@/data/resume";
import {
  PrStatusIcon,
  type ContributionStatus,
} from "@/components/ui/svgs/pr-status";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useState, type CSSProperties, type ReactNode } from "react";

type Contribution = {
  title: string;
  repo: string;
  dates: string;
  status: ContributionStatus;
  statusLabel: string;
  href: string;
  icon?: ReactNode;
};

const MARK_COLOR: Record<ContributionStatus, string> = {
  merged: "bg-signal",
  open: "bg-paper",
  draft: "bg-grey/60",
};

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** One tally mark per pull request, coloured by its state. */
function Tally({ prs }: { prs: Contribution[] }) {
  return (
    <span className="tally flex items-end gap-[3px]" aria-hidden>
      {prs.map((pr, i) => (
        <i key={pr.href} className={MARK_COLOR[pr.status]} style={vars({ "--i": i })} />
      ))}
    </span>
  );
}

/**
 * Repositories as an accordion: each row carries a tally of its pull requests
 * and opens onto them, titles aligned under the repository name.
 */
export default function ContributionsSection({
  copy,
  contributions,
}: {
  copy: SiteCopy["contributions"];
  contributions: Contribution[];
}) {
  const repos = new Map<string, Contribution[]>();
  for (const c of contributions) repos.set(c.repo, [...(repos.get(c.repo) ?? []), c]);
  const groups = [...repos];

  const [open, setOpen] = useState(() => new Set([groups[0]?.[0]]));
  const allOpen = groups.every(([repo]) => open.has(repo));
  const toggle = (repo: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(repo)) next.add(repo);
      return next;
    });

  const count = (status: ContributionStatus) =>
    contributions.filter((c) => c.status === status).length;

  return (
    <>
      <div className="mb-10 flex flex-col gap-5 md:mb-14" data-reveal="rise">
        <p className="max-w-[46ch] text-lg leading-snug text-paper md:text-xl">
          {copy.description}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <ul className="meta flex flex-wrap gap-x-5 gap-y-1.5 text-grey">
            {(Object.keys(MARK_COLOR) as ContributionStatus[]).filter(count).map((status) => (
              <li key={status} className="flex items-center gap-2">
                <i className={cn("h-3 w-[3px]", MARK_COLOR[status])} aria-hidden />
                <span>
                  <span className="text-paper">{count(status)}</span> {copy.summary[status]}
                </span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-expanded={allOpen}
            onClick={() => setOpen(new Set(allOpen ? [] : groups.map(([repo]) => repo)))}
            className="meta group flex items-center gap-2.5 text-grey transition-colors duration-200 hover:text-paper"
          >
            <span className="toggle-icon" aria-hidden />
            {allOpen ? copy.collapseAll : copy.expandAll}
          </button>
        </div>
      </div>

      <ol className="border-t border-rule">
        {groups.map(([repo, prs], i) => {
          const isOpen = open.has(repo);
          const id = `repo-${repo.replace(/\W+/g, "-")}`;
          const [owner, name] = repo.split("/");
          const dates = [...new Set(prs.map((pr) => pr.dates))];
          return (
            <li
              key={repo}
              className="repo border-b border-rule"
              data-open={isOpen || undefined}
              data-reveal="rise"
              style={vars({ "--d": `${Math.min(i, 6) * 60}ms` })}
            >
              <div className="repo-field">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => toggle(repo)}
                    className="sweep grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 px-1 py-5 text-left [--sweep-color:rgb(236_235_230/0.05)] [--sweep-ink:var(--color-paper)] md:grid-cols-9 md:gap-x-(--gutter) md:py-6"
                  >
                    <span className="flex items-center gap-4 md:col-span-2">
                      <span className="repo-logo grid size-6 place-items-center [&>*]:max-h-5">
                        {prs[0].icon}
                      </span>
                      <span className="max-md:hidden">
                        <Tally prs={prs} />
                      </span>
                    </span>
                    <span className="min-w-0 [overflow-wrap:anywhere] text-[clamp(1.25rem,1.7vw,1.625rem)] font-semibold leading-none tracking-[-0.025em] [font-variation-settings:'wdth'_106] md:col-span-4">
                      <span className="font-normal text-grey">{owner}/</span>
                      {name}
                    </span>
                    <span className="meta sweep-muted col-start-2 row-start-2 flex items-center gap-3 text-grey md:col-span-2 md:col-start-7 md:row-start-1">
                      <span className="md:hidden">
                        <Tally prs={prs} />
                      </span>
                      {prs.length} {prs.length === 1 ? "PR" : "PRs"}
                      <span className="md:hidden">· {dates.join(" – ")}</span>
                    </span>
                    <span className="meta sweep-muted col-start-3 row-start-1 flex items-center justify-end gap-4 text-grey md:col-span-1 md:col-start-9">
                      <span className="max-md:hidden whitespace-nowrap">{dates.join(" – ")}</span>
                      <span className="toggle-icon text-paper" aria-hidden />
                    </span>
                  </button>
                </h3>

                <div id={id} className="repo-panel" inert={!isOpen}>
                  <div>
                    <ol className="pb-3 md:pb-4">
                      {prs.map((pr, j) => (
                        <li
                          key={pr.href}
                          className="max-md:ml-10 md:grid md:grid-cols-9 md:gap-x-(--gutter)"
                          style={vars({ "--i": j })}
                        >
                          <div className="pr-rule h-px bg-rule md:col-span-7 md:col-start-3" aria-hidden />
                          <a
                            href={pr.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sweep group grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 px-1 py-4 md:col-span-9 md:grid-cols-9 md:items-baseline md:gap-x-(--gutter)"
                          >
                            <span className="meta sweep-muted flex items-baseline gap-2 text-grey md:col-span-2">
                              <PrStatusIcon
                                status={pr.status}
                                className="sweep-muted size-3.5 translate-y-[3px]"
                              />
                              {pr.statusLabel}
                            </span>
                            <span className="col-span-2 text-base font-medium leading-snug md:col-span-6 md:col-start-3 md:row-start-1 md:text-[1.0625rem]">
                              {pr.title}
                            </span>
                            <span className="meta sweep-muted col-start-2 row-start-1 flex items-center justify-end gap-2 text-grey md:col-span-1 md:col-start-9">
                              #{pr.href.split("/").pop()}
                              <ArrowUpRight className="sweep-arrow size-3.5" strokeWidth={1.5} aria-hidden />
                            </span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
