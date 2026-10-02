import { useEffect, useRef } from "react";

// Fixed full-page grid. A brighter amber copy of the grid is revealed around the cursor
// through a radial mask driven by --mx / --my. Touch devices just get the plain grid.
const BlueprintGrid = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let x = -9999;
    let y = -9999;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      queue();
    };
    const onLeave = () => {
      x = -9999;
      y = -9999;
      queue();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="blueprint-grid" aria-hidden="true" />;
};

export default BlueprintGrid;
