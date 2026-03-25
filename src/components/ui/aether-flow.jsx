import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// GLSL — Aether Flow: multi-layered domain-warped FBM with mouse warp
//
// Ported from Three.js to raw WebGL — zero external dependencies.
// Dual-mode palette via uDark uniform: complementary colors for each theme.
// ---------------------------------------------------------------------------
const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;

uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uMouse;
uniform float uDark;

// --- HSV to RGB conversion ---
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float hash(vec2 st) {
  return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i),               hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// 5-octave FBM — good detail without hammering mediump
float fbm(vec2 st) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(st);
    st *= 2.0;
    a *= 0.5;
  }
  return v;
}

mat2 rotate(float angle) {
  float c = cos(angle), s = sin(angle);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
  float t = uTime * 0.15;

  // Mouse warp — subtle pull toward cursor
  vec2 mouseUV = (uMouse * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
  float warp = smoothstep(0.7, 0.0, distance(uv, mouseUV)) * 0.4;

  vec2 p = uv * rotate(t * 0.1) + warp;

  // Triple-layer domain warping — each layer feeds into the next
  float n1 = fbm(p * 1.2 + vec2(t * 0.10,  t * 0.20));
  float n2 = fbm(p * 2.0 + n1  + vec2(-t * 0.25,  t * 0.15));
  float n3 = fbm(p * 3.5 + n2  + vec2( t * 0.10, -t * 0.20));

  float f = n1 * 0.6 + n2 * 0.25 + n3 * 0.15;

  // --- Theme-adaptive HSV coloring ---
  // Dark mode: teal-cyan hue (180-200) — cool complement to warm amber accent
  // Light mode: soft violet-lavender hue (260-280) — barely-there tint
  float baseHue = mix(260.0, 190.0, uDark) / 360.0;
  float hueShift = f * 0.08;

  // Saturation: light mode very desaturated so it doesn't fight the text
  float sat = mix(0.12, 0.55, uDark) + f * mix(0.08, 0.3, uDark);

  // Value/brightness: light mode stays very close to the bg gray (~0.93-0.96)
  float darkVal  = 0.10 + pow(f, 2.5) * 0.55;
  float lightVal = 0.93 + pow(f, 3.0) * 0.03;
  float val = mix(lightVal, darkVal, uDark);

  // Hot highlights — visible in dark, nearly invisible in light
  float peak = pow(smoothstep(0.7, 1.0, f), 3.0);
  val += peak * mix(0.02, 0.45, uDark);

  vec3 col = hsv2rgb(vec3(baseHue + hueShift, sat, val));

  // Vignette — fade edges to the mode's base tone
  float vig = 1.0 - smoothstep(0.8, 1.5, length(uv));
  // Light edge matches --background (hsl 214 20% 95%) ≈ rgb(0.93, 0.94, 0.96)
  vec3 edge = mix(vec3(0.93, 0.94, 0.96), vec3(0.03, 0.02, 0.05), uDark);
  col = mix(edge, col, vig);

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
const AetherFlow = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    const program  = buildProgram(gl);
    const posLoc   = gl.getAttribLocation(program, "a_pos");
    const timeLoc  = gl.getUniformLocation(program, "uTime");
    const resLoc   = gl.getUniformLocation(program, "uResolution");
    const mouseLoc = gl.getUniformLocation(program, "uMouse");
    const darkLoc  = gl.getUniformLocation(program, "uDark");

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1,
    ]), gl.STATIC_DRAW);

    gl.useProgram(program);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    let mouseX = 0, mouseY = 0;

    // 1x DPR — background shaders don't need retina resolution
    const resize = () => {
      canvas.width  = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      mouseX = canvas.width / 2;
      mouseY = canvas.height / 2;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = canvas.height - e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const isDark = () => document.documentElement.classList.contains("dark");

    let rafId = null;
    const start = performance.now();

    const draw = (now) => {
      gl.uniform1f(timeLoc, (now - start) / 1000);
      gl.uniform2f(mouseLoc, mouseX, mouseY);
      gl.uniform1f(darkLoc, isDark() ? 1.0 : 0.0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(draw);
    };

    let inView = false;

    const startLoop = () => {
      if (inView && !rafId) {
        canvas.style.opacity = "1";
        rafId = requestAnimationFrame(draw);
      }
    };

    const stopLoop = () => {
      cancelAnimationFrame(rafId);
      rafId = null;
      canvas.style.opacity = "0";
    };

    // Observe the parent section (not the fixed canvas) for visibility
    const section = canvas.closest("section") || canvas.parentElement;
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      inView ? startLoop() : stopLoop();
    }, { threshold: 0 });
    io.observe(section);

    canvas.style.opacity = "1";

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
      io.disconnect();
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 h-full w-full transition-opacity duration-700 pointer-events-none"
    />
  );
};

export default AetherFlow;
