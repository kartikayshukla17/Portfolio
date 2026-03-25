import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// GLSL — full-screen quad (clip space positions, UVs derived in vertex shader)
// ---------------------------------------------------------------------------
const VERT = `
attribute vec2 a_pos;
varying vec2 vUv;
void main() {
  vUv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

// ---------------------------------------------------------------------------
// Fragment shader — domain-warped FBM aurora
//
// Technique: warp UV coordinates with noise before sampling FBM again.
// Each layer of warping creates organic, fluid shapes that plain noise can't.
// Colors are very dark — the effect reads as "depth" not "decoration".
// ---------------------------------------------------------------------------
const FRAG = `
precision mediump float;

uniform float uTime;
varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i),               hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

// 4-octave FBM — keeps mediump precision comfortable
float fbm(vec2 p) {
  float s = 0.0;
  s += 0.500 * noise(p); p = p * 2.02 + vec2(1.30,  1.70);
  s += 0.250 * noise(p); p = p * 2.03 + vec2(3.70,  5.10);
  s += 0.125 * noise(p); p = p * 2.01 + vec2(7.30, -2.90);
  s += 0.063 * noise(p);
  return s / 0.938;
}

void main() {
  float t = uTime * 0.07;
  vec2 uv = vUv;

  // Domain warp pass 1 — generates organic flow directions
  vec2 warp = vec2(
    fbm(uv * 1.8 + vec2( t * 0.40,  t * 0.30)),
    fbm(uv * 1.8 + vec2(-t * 0.30,  t * 0.20) + 3.7)
  );

  // Domain warp pass 2 — warp again using first warp, creates the fluid folds
  float f = fbm(uv * 2.0 + warp * 0.45 + t * 0.08);

  // Palette — very dark; all values well below 0.2 so the effect is felt not seen
  vec3 base  = vec3(0.030, 0.018, 0.048); // near-black, slight purple
  vec3 amber = vec3(0.700, 0.380, 0.040); // portfolio accent hue
  vec3 cool  = vec3(0.040, 0.080, 0.200); // deep blue counterpoint

  vec3 col = base;
  col += amber * smoothstep(0.48, 0.76, f)         * 0.14;
  col += cool  * smoothstep(0.30, 0.58, 1.0 - f)   * 0.09;

  // Radial mask — effect is strongest near the center-top (where the headline sits)
  // and fades smoothly to pure base at the edges
  float radial = 1.0 - smoothstep(0.15, 0.85, length(uv - vec2(0.5, 0.38)) * 1.3);
  col = mix(base, col, radial);

  gl_FragColor = vec4(col, 1.0);
}`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const compileShader = (gl, type, src) => {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
};

const buildProgram = (gl) => {
  const p = gl.createProgram();
  gl.attachShader(p, compileShader(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(p, compileShader(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(p);
  return p;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const ShaderCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return; // graceful fallback — plain dark background shows instead

    const program = buildProgram(gl);
    const posLoc  = gl.getAttribLocation(program, "a_pos");
    const timeLoc = gl.getUniformLocation(program, "uTime");

    // Full-screen quad — two triangles covering clip space [-1, 1]
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,   1, -1,  -1,  1,
      -1,  1,   1, -1,   1,  1,
    ]), gl.STATIC_DRAW);

    gl.useProgram(program);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Resize at 1× DPR — background shaders don't need retina sharpness,
    // and halving fragment count on 2× screens cuts cost significantly
    const resize = () => {
      canvas.width  = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // RAF loop — paused when hero is off-screen OR when in light mode
    let rafId = null;
    const start = performance.now();

    const isDark = () => document.documentElement.classList.contains("dark");

    const draw = (now) => {
      gl.uniform1f(timeLoc, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(draw);
    };

    let inView = false;

    const startLoop = () => {
      if (isDark() && inView && !rafId) {
        canvas.style.opacity = "1";
        rafId = requestAnimationFrame(draw);
      }
    };

    const stopLoop = () => {
      cancelAnimationFrame(rafId);
      rafId = null;
      canvas.style.opacity = "0";
    };

    // IntersectionObserver — pause when hero scrolls out of view
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      inView ? startLoop() : stopLoop();
    }, { threshold: 0 });
    io.observe(canvas);

    // MutationObserver — react to dark/light mode class toggle on <html>
    const mo = new MutationObserver(() => {
      isDark() ? startLoop() : stopLoop();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Set initial visibility based on current theme
    canvas.style.opacity = isDark() ? "1" : "0";

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full transition-opacity duration-500"
    />
  );
};

export default ShaderCanvas;
