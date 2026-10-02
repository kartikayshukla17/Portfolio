import React from "react";

import { cn } from "@/lib/utils"

// Primary action button: one per view. Magic UI ShimmerButton, tuned for this site
// (pill, amber light, black base, slow 6s sweep). Renders an <a> when given an href.
// One size for every button on the site (taller on touch screens for an easier target)
const SIZE = "h-10 px-5 text-sm pointer-coarse:h-11"

export const ShimmerButton = React.forwardRef((
  {
    shimmerColor = "#f5b942",
    shimmerSize = "0.05em",
    shimmerDuration = "6s",
    borderRadius = "100px",
    background = "rgba(0, 0, 0, 1)",
    className,
    children,
    ...props
  },
  ref
) => {
  const Comp = props.href ? "a" : "button"

  return (
    <Comp
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background
        }
      }
      className={cn(
        "group relative z-0 inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden [border-radius:var(--radius)] border border-white/20 font-body font-medium whitespace-nowrap text-white [background:var(--bg)] no-underline",
        "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        "disabled:cursor-not-allowed disabled:opacity-60",
        SIZE,
        className
      )}
      ref={ref}
      {...props}>
      {/* spark container */}
      <div
        className={cn("-z-30 blur-[2px]", "@container-[size] absolute inset-0 overflow-visible")}>
        {/* spark */}
        <div
          className="animate-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none] motion-reduce:animate-none">
          {/* spark before */}
          <div
            className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] motion-reduce:animate-none" />
        </div>
      </div>
      {children}

      {/* Highlight */}
      <div
        className={cn(
          "absolute inset-0 size-full",
          "[border-radius:var(--radius)] shadow-[inset_0_-8px_10px_#ffffff1f]",
          // transition
          "transform-gpu transition-all duration-300 ease-in-out",
          // on hover
          "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
          // on click
          "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
        )} />

      {/* backdrop */}
      <div
        className={cn(
          "absolute inset-(--cut) -z-20 [border-radius:var(--radius)] [background:var(--bg)]"
        )} />
    </Comp>
  );
})

ShimmerButton.displayName = "ShimmerButton"
