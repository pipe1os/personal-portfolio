import { cn } from "@/lib/utils";
import { motion, type Variants } from "motion/react";
import { useMemo, type ReactNode } from "react";

interface BlurFadeTextProps {
  text: ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  characterDelay?: number;
  delay?: number;
  yOffset?: number;
  animateByCharacter?: boolean;
}
const BlurFadeText = ({
  text,
  className,
  variant,
  duration = 0.4,
  characterDelay = 0.03,
  delay = 0,
  yOffset = 8,
  animateByCharacter = false,
}: BlurFadeTextProps) => {
  const defaultVariants: Variants = {
    hidden: { y: -yOffset, opacity: 0, filter: "blur(8px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
  };
  const combinedVariants = variant || defaultVariants;
  const characters = useMemo(
    () => (typeof text === "string" ? Array.from(text) : []),
    [text]
  );

  if (animateByCharacter && typeof text === "string") {
    return (
      <div className="flex">
        {characters.map((char, i) => {
          const charVariants: Variants = {
            hidden: { y: -yOffset, opacity: 0, filter: "blur(8px)" },
            visible: { y: 0, opacity: 1, filter: "blur(0px)" },
          };
          return (
            <motion.span
              key={i}
              initial="hidden"
              animate="visible"
              variants={charVariants}
              transition={{
                duration,
                delay: delay + i * characterDelay,
                ease: "easeOut",
              }}
              className={cn(
                "inline-block",
                className,
                char.trim() === "" && "w-[0.2em]",
              )}
            >
              {char}
            </motion.span>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex">
      <motion.span
        initial="hidden"
        animate="visible"
        variants={combinedVariants}
        transition={{
          duration,
          delay,
          ease: "easeOut",
        }}
        className={cn("inline-block", className)}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default BlurFadeText;
