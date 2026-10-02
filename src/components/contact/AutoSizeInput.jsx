import { useCallback, useLayoutEffect, useRef } from "react";

// A text input whose width follows its content, so it can sit inside a sentence.
export default function AutoSizeInput({ value, placeholder, className, ...props }) {
  const ref = useRef(null);

  const fit = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const cs = getComputedStyle(el);
    const probe = document.createElement("span");
    probe.style.cssText = `position:absolute;visibility:hidden;white-space:pre;font:${cs.font}`;
    probe.textContent = value || placeholder || "";
    document.body.appendChild(probe);
    el.style.width = `${Math.ceil(probe.getBoundingClientRect().width + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) + 6)}px`;
    probe.remove();
  }, [value, placeholder]);

  useLayoutEffect(() => {
    fit();
    document.fonts?.ready.then(fit);
  }, [fit]);

  return <input ref={ref} value={value} placeholder={placeholder} className={className} {...props} />;
}
