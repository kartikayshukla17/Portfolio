import { useEffect, useMemo, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { isDimmed, rotate, spherePoints } from "@/lib/skills";
import IconTile from "./IconTile";

// Decorative 3D cloud of logos. Drag to spin, hover to pause. The table below is the real list.
export default function IconCloud({ items, activeId }) {
  const hostRef = useRef(null);
  const tileRefs = useRef([]);
  const reduced = usePrefersReducedMotion();
  const points = useMemo(() => spherePoints(items.length), [items.length]);
  const motion = useRef({ pts: points, vx: 0, vy: 0, drag: false, hover: false, lx: 0, ly: 0 });

  useEffect(() => {
    const host = hostRef.current;
    const m = motion.current;
    m.pts = points;
    let raf = 0;

    const draw = () => {
      const radius = Math.max(0, Math.min(host.clientWidth, host.clientHeight) / 2 - 34);
      m.pts.forEach((p, i) => {
        const el = tileRefs.current[i];
        if (!el) return;
        const depth = (p.z + 1.6) / 2.6;
        el.style.transform = `translate(${p.x * radius}px, ${p.y * radius}px) scale(${0.55 + depth * 0.6})`;
        el.style.opacity = String(0.25 + depth * 0.75);
        el.style.zIndex = String(Math.round(depth * 100));
      });
    };

    const tick = () => {
      if (!reduced) {
        const f = m.hover || m.drag ? 0 : 1;
        m.vx *= 0.95;
        m.vy *= 0.95;
        m.pts = m.pts.map((p) => rotate(p, 0.002 * f + m.vx, 0.004 * f + m.vy));
      }
      draw();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [points, reduced]);

  const m = motion.current;
  const handlers = {
    onPointerDown: (e) => {
      m.drag = true;
      m.lx = e.clientX;
      m.ly = e.clientY;
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    onPointerMove: (e) => {
      if (!m.drag) return;
      m.vy = (e.clientX - m.lx) * 0.0006;
      m.vx = -(e.clientY - m.ly) * 0.0006;
      m.lx = e.clientX;
      m.ly = e.clientY;
    },
    onPointerUp: () => {
      m.drag = false;
    },
    // the browser takes over a vertical swipe (page scroll) and cancels the pointer
    onPointerCancel: () => {
      m.drag = false;
    },
    onLostPointerCapture: () => {
      m.drag = false;
    },
    onPointerEnter: () => {
      m.hover = true;
    },
    onPointerLeave: () => {
      m.hover = false;
    },
  };

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      {...handlers}
      className="relative mx-auto h-[min(70vh,34rem)] w-full max-w-3xl cursor-grab touch-pan-y select-none active:cursor-grabbing"
    >
      {items.map((item, i) => (
        <IconTile
          key={item.name}
          item={item}
          ref={(el) => {
            tileRefs.current[i] = el;
          }}
          className={cn(
            "absolute left-1/2 top-1/2 -ml-[1.7rem] -mt-[1.7rem] h-[3.4rem] w-[3.4rem] will-change-transform transition-[filter] duration-300",
            isDimmed(item, activeId) && "brightness-50 grayscale"
          )}
        />
      ))}
    </div>
  );
}
