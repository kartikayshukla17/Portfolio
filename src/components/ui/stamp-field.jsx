import { useEffect, useRef } from "react";

const StampField = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let lampX = -9999;
    let lampY = -9999;
    let targetX = -9999;
    let targetY = -9999;
    let rafId = 0;
    let running = true;

    const hide = () => {
      targetX = -9999;
      targetY = -9999;
      lampX = -9999;
      lampY = -9999;
      el.style.setProperty("--stamp-x", "-9999px");
      el.style.setProperty("--stamp-y", "-9999px");
    };

    const paint = () => {
      if (!running) return;
      if (targetX < 0) {
        rafId = requestAnimationFrame(paint);
        return;
      }
      lampX += (targetX - lampX) * 0.18;
      lampY += (targetY - lampY) * 0.18;
      el.style.setProperty("--stamp-x", `${lampX}px`);
      el.style.setProperty("--stamp-y", `${lampY}px`);
      rafId = requestAnimationFrame(paint);
    };

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (lampX < 0) {
        lampX = targetX;
        lampY = targetY;
      }
    };

    hide();
    rafId = requestAnimationFrame(paint);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <div ref={ref} className="page-stamps" aria-hidden="true">
      <div className="page-stamps__lamp" />
      <div className="page-stamps__ink" />
    </div>
  );
};

export default StampField;
