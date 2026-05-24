import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';

import { Python } from '@/components/ui/svgs/python';
import { Vercel } from '@/components/ui/svgs/vercel';
import GeodeIcon from '@/components/ui/svgs/geode';
import { Icons } from '@/components/icons';

const OrgBadge = ({ icon, name, href }: { icon: React.ReactNode; name: string; href?: string }) => {
  const content = (
    <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-3 flex items-center gap-2 text-sm text-foreground transition-all duration-200 hover:bg-muted/50 select-none">
      <div className="flex items-center justify-center w-4 h-4 text-muted-foreground">
        {icon}
      </div>
      <span className="font-medium">{name}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }
  return content;
};

const RepoIcon = () => (
  <svg
    aria-hidden="true"
    height="16"
    viewBox="0 0 16 16"
    version="1.1"
    width="16"
    className="octicon octicon-repo flex-shrink-0 text-emerald-500 mt-1 mr-2 fill-current size-4"
  >
    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
  </svg>
);

const TRANSLATIONS = {
  es: {
    title: "Actividad en GitHub",
    overview: "Resumen de actividad",
    contributedTo: "Contribuido a",
    andOtherRepos: "y otros repositorios",
    codeReview: "Revisiones",
    pullRequests: "Pull requests",
    issues: "Issues",
    commits: "Commits",
    loading: "Cargando actividad...",
  },
  en: {
    title: "GitHub Activity",
    overview: "Activity overview",
    contributedTo: "Contributed to",
    andOtherRepos: "and other repositories",
    codeReview: "Reviews",
    pullRequests: "Pull requests",
    issues: "Issues",
    commits: "Commits",
    loading: "Loading activity...",
  }
};

const calendarLabels = {
  es: {
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    totalCount: '{{count}} contribuciones en el último año',
    legend: {
      less: 'Menos',
      more: 'Más',
    }
  },
  en: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    totalCount: '{{count}} contributions in the last year',
    legend: {
      less: 'Less',
      more: 'More',
    }
  }
};

export default function GitHubActivityDashboard({ stats, language = "es" }: { stats: any; language?: "es" | "en" }) {
  const [mounted, setMounted] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(1200);

  React.useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const t = TRANSLATIONS[language] || TRANSLATIONS.es;

  const topRepos = stats?.commitContributionsByRepository?.map(
    (repoNode: any) => repoNode.repository.nameWithOwner
  ) || ["pipe1os/FEUCSC-FINANZAS", "pipe1os/pipe1os", "pipe1os/personal-portfolio"];

  let blockSize = 8;
  let blockMargin = 2;

  if (windowWidth < 480) {
    blockSize = 4;
    blockMargin = 1;
  } else if (windowWidth < 640) {
    blockSize = 6;
    blockMargin = 2;
  } else if (windowWidth < 768) {
    blockSize = 7;
    blockMargin = 2;
  }

  if (!mounted) {
    return (
      <div className="w-full mx-auto bg-background text-card-foreground p-6 md:p-8 rounded-xl border border-border shadow-sm mt-12 mb-12 animate-pulse">
        <div className="h-7 bg-muted/40 rounded-lg w-48 mb-6"></div>
        <div className="h-[140px] bg-muted/20 border border-border/50 rounded-xl w-full mb-6 flex items-center justify-center">
          <div className="text-xs text-muted-foreground/50">{t.loading}</div>
        </div>
        <div className="flex gap-3 mb-8">
          <div className="h-8 bg-muted/40 rounded-xl w-24"></div>
          <div className="h-8 bg-muted/40 rounded-xl w-24"></div>
          <div className="h-8 bg-muted/40 rounded-xl w-28"></div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-8 pt-6 border-t border-border/50">
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-6 bg-muted/40 rounded-lg w-36 mb-3"></div>
            <div className="h-4 bg-muted/40 rounded-lg w-full mb-2"></div>
            <div className="h-4 bg-muted/40 rounded-lg w-2/3"></div>
          </div>
          <div className="flex justify-center items-center p-2 bg-muted/10 border border-border/30 rounded-2xl">
            <div className="w-56 h-56 rounded-full bg-muted/20 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const commits = stats?.totalCommitContributions || 0;
  const prs = stats?.totalPullRequestContributions || 0;
  const issues = stats?.totalIssueContributions || 0;
  const reviews = stats?.totalPullRequestReviewContributions || 0;
  const total = commits + prs + issues + reviews;

  const commitPct = total > 0 ? commits / total : 0.6;
  const prPct = total > 0 ? prs / total : 0.2;
  const issuePct = total > 0 ? issues / total : 0.1;
  const reviewPct = total > 0 ? reviews / total : 0.1;

  const cVal = Math.max(0.12, commitPct) * 50;
  const pVal = Math.max(0.12, prPct) * 50;
  const iVal = Math.max(0.12, issuePct) * 50;
  const rVal = Math.max(0.12, reviewPct) * 50;

  const points = `100,${100 - rVal} ${100 + iVal},100 100,${100 + pVal} ${100 - cVal},100`;

  return (
    <div className="w-full mx-auto bg-background text-card-foreground p-6 md:p-8 rounded-xl border border-border shadow-sm relative overflow-hidden transition-all duration-200">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-foreground">
        <Icons.github className="size-5 text-muted-foreground" />
        {t.title}
      </h2>

      <div
        className="w-full flex justify-center items-center py-4 bg-muted/10 border border-border/30 rounded-xl mb-6 p-4 overflow-x-auto select-none no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .no-scrollbar::-webkit-scrollbar,
          .no-scrollbar *::-webkit-scrollbar {
            display: none !important;
          }
          .no-scrollbar,
          .no-scrollbar * {
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
          }
        `}} />
        <GitHubCalendar
          username="pipe1os"
          colorScheme="dark"
          blockSize={blockSize}
          blockMargin={blockMargin}
          labels={calendarLabels[language] || calendarLabels.es}
          theme={{
            dark: ['#18181b', '#064e3b', '#047857', '#10b981', '#34d399']
          }}
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <OrgBadge
          icon={<Python className="w-4 h-4 fill-current text-sky-500" />}
          name="@python"
          href="https://github.com/python"
        />
        <OrgBadge
          icon={<Vercel className="w-3.5 h-3.5 fill-current text-foreground" />}
          name="@vercel"
          href="https://github.com/vercel"
        />
        <OrgBadge
          icon={<GeodeIcon className="w-4 h-4 text-emerald-500" />}
          name="@geode-sdk"
          href="https://github.com/geode-sdk"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-stretch gap-8 pt-6 border-t border-border/50">

        <div className="flex-1 flex flex-col justify-center max-w-md">
          <h3 className="text-foreground font-semibold mb-3 text-lg">{t.overview}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed flex items-start gap-1">
            <RepoIcon />
            <span>
              {t.contributedTo}{" "}
              <a
                href={`https://github.com/${topRepos[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium inline-flex items-center gap-0.5 transition-colors"
              >
                {topRepos[0]}
              </a>
              {", "}
              <a
                href={`https://github.com/${topRepos[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium inline-flex items-center gap-0.5 transition-colors"
              >
                {topRepos[1]}
              </a>
              {", "}
              <a
                href={`https://github.com/${topRepos[2]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium inline-flex items-center gap-0.5 transition-colors"
              >
                {topRepos[2]}
              </a>{" "}
              {t.andOtherRepos}.
            </span>
          </p>
        </div>

        <div className="flex justify-center items-center self-center md:self-auto">
          <div className="w-56 h-56 relative text-xs text-muted-foreground select-none">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="12.5" fill="none" stroke="currentColor" className="opacity-[0.05]" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="100" cy="100" r="25" fill="none" stroke="currentColor" className="opacity-[0.05]" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="100" cy="100" r="37.5" fill="none" stroke="currentColor" className="opacity-[0.05]" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" className="opacity-[0.08]" strokeWidth="1" />

              <line x1="100" y1="50" x2="100" y2="150" stroke="currentColor" className="opacity-[0.12]" strokeWidth="1.5" />
              <line x1="50" y1="100" x2="150" y2="100" stroke="currentColor" className="opacity-[0.12]" strokeWidth="1.5" />

              <polygon
                points={points}
                fill="rgba(16, 185, 129, 0.15)"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinejoin="round"
                className="transition-all duration-700 ease-out"
              />

              <circle cx="100" cy={100 - rVal} r="3.5" fill="#34d399" className="transition-all duration-700 ease-out" />
              <circle cx={100 + iVal} cy="100" r="3.5" fill="#34d399" className="transition-all duration-700 ease-out" />
              <circle cx="100" cy={100 + pVal} r="3.5" fill="#34d399" className="transition-all duration-700 ease-out" />
              <circle cx={100 - cVal} cy="100" r="3.5" fill="#34d399" className="transition-all duration-700 ease-out" />

              <text x="100" y="30" textAnchor="middle" fill="currentColor" className="text-muted-foreground font-medium text-[10px]">{t.codeReview}</text>
              <text x="100" y="40" textAnchor="middle" fill="#34d399" className="font-bold text-[9px]">{reviews} ({Math.round(reviewPct * 100)}%)</text>

              <text x="100" y="166" textAnchor="middle" fill="currentColor" className="text-muted-foreground font-medium text-[10px]">{t.pullRequests}</text>
              <text x="100" y="176" textAnchor="middle" fill="#34d399" className="font-bold text-[9px]">{prs} ({Math.round(prPct * 100)}%)</text>

              <text x="156" y="96" textAnchor="start" fill="currentColor" className="text-muted-foreground font-medium text-[10px]">{t.issues}</text>
              <text x="156" y="106" textAnchor="start" fill="#34d399" className="font-bold text-[9px]">{issues} ({Math.round(issuePct * 100)}%)</text>

              <text x="44" y="96" textAnchor="end" fill="currentColor" className="text-muted-foreground font-medium text-[10px]">{t.commits}</text>
              <text x="44" y="106" textAnchor="end" fill="#34d399" className="font-bold text-[9px]">{commits} ({Math.round(commitPct * 100)}%)</text>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}