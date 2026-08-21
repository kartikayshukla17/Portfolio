import { useEffect, useRef } from "react";

const lerp = (a, b, t) => a + (b - a) * t;

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // No cursor on touch/stylus devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Start off-screen until first mousemove
    let mouseX = -100, mouseY = -100;
    let dotX = -100, dotY = -100;
    let ringX = -100, ringY = -100;
    let ringScale = 1;
    let hovering = false;
    let visible = false;
    let rafId;

    // Inject cursor:none globally — fully reversed on cleanup
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    // Event delegation — one listener covers all current and future interactive elements
    const onMouseOver = (e) => {
      if (e.target.closest("a, button, [role='button'], label")) hovering = true;
    };
    const onMouseOut = (e) => {
      if (e.target.closest("a, button, [role='button'], label")) hovering = false;
    };

    // Hide when mouse leaves the window
    const onMouseLeave = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; visible = false; };
    const onMouseEnter = () => { if (visible) { dot.style.opacity = "1"; ring.style.opacity = "1"; } };

    const tick = () => {
      // Dot: snappier follow (0.22)
      dotX = lerp(dotX, mouseX, 0.22);
      dotY = lerp(dotY, mouseY, 0.22);

      // Ring: heavier lag (0.10) — this is the "lerp" feel
      ringX = lerp(ringX, mouseX, 0.10);
      ringY = lerp(ringY, mouseY, 0.10);

      // Scale lerp — smooth expansion on hover, smooth contraction on leave
      ringScale = lerp(ringScale, hovering ? 1.65 : 1, 0.14);

      // Only transform is written — GPU composited, no layout reflow
      dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${ringScale})`;

      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Inner dot — small, snappy */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none h-[6px] w-[6px] rounded-full bg-foreground opacity-0 transition-opacity duration-300"
        style={{ willChange: "transform" }}
      />
      {/* Outer ring — larger, lags behind, expands on hover */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none h-8 w-8 rounded-full border border-foreground/35 opacity-0 transition-opacity duration-300"
        style={{ willChange: "transform" }}
      />
    </>
  );
};

export default CustomCursor;
