import BlurFade from "@/components/magicui/blur-fade";
import type { SiteCopy } from "@/data/resume";
import {
  PrStatusIcon,
  type ContributionStatus,
} from "@/components/ui/svgs/pr-status";
import { ArrowUpRight } from "lucide-react";

const BASE_DELAY = 0.04 * 11;

type Contribution = {
  title: string;
  repo: string;
  dates: string;
  status: ContributionStatus;
  statusLabel: string;
  href: string;
  icon: React.ReactNode;
};

export default function ContributionsSection({
  copy,
  contributions,
}: {
  copy: SiteCopy["contributions"];
  contributions: Contribution[];
}) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-1">
      <BlurFade delay={BASE_DELAY}>
        <h2 className="text-xl font-bold">{copy.heading}</h2>
      </BlurFade>
      <BlurFade delay={BASE_DELAY + 0.04}>
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          {copy.description}
        </p>
      </BlurFade>
      </div>
      <div className="flex flex-col gap-8">
        {contributions.map((contribution, index) => (
          <BlurFade
            key={contribution.href}
            delay={BASE_DELAY + 0.08 + index * 0.05}
          >
            <a
              href={contribution.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-x-3 justify-between group w-full"
            >
              <div className="flex items-center gap-x-3 flex-1 min-w-0">
                <div className="size-8 md:size-10 p-1.5 border rounded-full shadow ring-2 ring-border bg-background flex items-center justify-center flex-none overflow-hidden">
                  {contribution.icon}
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <div className="font-semibold leading-none flex items-center gap-2">
                    {contribution.title}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      aria-hidden
                    />
                  </div>
                  <div className="font-sans text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 leading-none">
                    <span>{contribution.repo}</span>
                    <span className="text-muted-foreground/30">•</span>
                    <span className="inline-flex items-center gap-1">
                      <PrStatusIcon status={contribution.status} />
                      {contribution.statusLabel}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground text-right flex-none">
                <span>{contribution.dates}</span>
              </div>
            </a>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
