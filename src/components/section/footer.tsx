import type { ReactNode } from "react";

export default function Footer({ socialLinks }: { socialLinks?: ReactNode }) {
  return (
    <footer className="mt-8 pt-6 animate-fade-in-up">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">&copy; 2026 Felipe Arce</p>
        {socialLinks}
      </div>
    </footer>
  );
}
