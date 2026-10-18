import { cn } from "@/lib/utils";
import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Display type set letter by letter. Each letter rides Mona Sans's width and
 * weight axes: it widens in on entrance, swells under the pointer or a thumb
 * swept across it (the lens), and condenses as the heading scrolls away
 * (CSS scroll timeline).
 */
export function DisplayName({
  lines,
  className,
  as: Tag = "h1",
  id,
  reveal,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "p";
  id?: string;
  reveal?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const letters = Array.from(el.querySelectorAll<HTMLElement>(".ch"));
    let frame = 0;
    let px = 0;
    let py = 0;

    const update = () => {
      frame = 0;
      for (const letter of letters) {
        const r = letter.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2);
        const dy = (py - (r.top + r.height / 2)) * 1.4;
        const t = Math.max(0, 1 - Math.hypot(dx, dy) / (r.height * 1.25));
        letter.style.setProperty("--lens", (t * t * (3 - 2 * t)).toFixed(3));
      }
    };

    const onMove = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const pad = box.height * 0.35;
      if (
        e.clientY < box.top - pad ||
        e.clientY > box.bottom + pad ||
        e.clientX < box.left - pad ||
        e.clientX > box.right + pad
      ) {
        if (px !== -1) {
          px = -1;
          letters.forEach((l) => l.style.setProperty("--lens", "0"));
        }
        return;
      }
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };

    // A finger has no hover: let go and the letters settle back.
    const onRelease = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      px = -1;
      letters.forEach((l) => l.style.setProperty("--lens", "0"));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onRelease, { passive: true });
    window.addEventListener("pointercancel", onRelease, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onRelease);
      window.removeEventListener("pointercancel", onRelease);
      cancelAnimationFrame(frame);
    };
  }, []);

  let index = 0;

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn("display-name", className)}
      data-reveal={reveal ? "type" : undefined}
    >
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((line, li) => (
        <span className="line" aria-hidden="true" key={li}>
          {Array.from(line).map((char) => {
            const i = index++;
            return (
              <span
                className="ch"
                key={i}
                style={{ "--i": i } as CSSProperties}
              >
                {char === " " ? " " : char}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
