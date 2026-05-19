import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import type { SiteCopy } from "@/data/resume";
import { toast } from "sonner";

export default function ContactSection({
  copy,
}: {
  copy: SiteCopy["contact"];
}) {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DATA.contact.email);
      toast.success(copy.copySuccess);
    } catch (err) {
      toast.error(copy.copyError);
    }
  };

  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">
          {copy.label}
        </span>
      </div>
      <div className="absolute inset-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full mask-fade-bottom"
          squareSize={2}
          gridGap={2}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {copy.heading}
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          {copy.description}
        </p>
        <div className="flex gap-4">
          <button
            onClick={copyEmail}
            className="group inline-flex cursor-pointer items-center gap-2 bg-transparent p-0 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icons.email className="size-5" />
            <span>{DATA.contact.email}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
