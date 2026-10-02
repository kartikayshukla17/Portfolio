import React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils"

// Secondary action: a text link with an always-visible hairline underline (so it reads as
// clickable on touch) and an arrow chip that fills amber and turns to ↗ on hover.
// Renders an <a> when given an href, otherwise a <button>.
// Same height and type as ShimmerButton so a pair lines up
const SIZE = "h-10 gap-2 text-sm pointer-coarse:h-11"
const CHIP = "h-6 w-6"

export const LinkButton = React.forwardRef((
  { arrow = true, className, children, ...props },
  ref
) => {
  const Comp = props.href ? "a" : "button"

  return (
    <Comp
      ref={ref}
      className={cn(
        "group inline-flex cursor-pointer items-center rounded-lg px-1 font-body font-medium whitespace-nowrap text-foreground no-underline",
        "transition-transform duration-200 active:translate-y-px motion-reduce:transition-none",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        "disabled:cursor-not-allowed disabled:opacity-45",
        SIZE,
        className
      )}
      {...props}>
      <span className="relative">
        {children}
        {/* resting underline */}
        <span aria-hidden="true" className="absolute inset-x-0 -bottom-[0.28em] h-px bg-foreground/40" />
        {/* amber line: draws in from the left, leaves to the right */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-[0.3em] h-0.5 origin-right scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100 motion-reduce:transition-none" />
      </span>
      {arrow && (
        <span
          aria-hidden="true"
          className={cn(
            "grid place-items-center rounded-full border border-foreground/30 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground motion-reduce:transition-none",
            CHIP
          )}>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-45 motion-reduce:transition-none" />
        </span>
      )}
    </Comp>
  );
})

LinkButton.displayName = "LinkButton"
