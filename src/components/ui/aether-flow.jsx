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
  float t = uTime * 0.08;

  // Mouse warp — subtle pull toward cursor
  vec2 mouseUV = (uMouse * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
  float warp = smoothstep(0.7, 0.0, distance(uv, mouseUV)) * 0.22;

  vec2 p = uv * rotate(t * 0.08) + warp;

  float n1 = fbm(p * 1.1 + vec2(t * 0.08,  t * 0.14));
  float n2 = fbm(p * 1.8 + n1  + vec2(-t * 0.16,  t * 0.10));
  float n3 = fbm(p * 2.8 + n2  + vec2( t * 0.07, -t * 0.12));

  float f = n1 * 0.62 + n2 * 0.26 + n3 * 0.12;

  // Amber paper — same hue as --accent (38), not violet/teal
  float baseHue = 38.0 / 360.0;
  float hueShift = f * 0.06;

  float sat = mix(0.22, 0.42, uDark) + f * mix(0.10, 0.18, uDark);

  float darkVal  = 0.045 + pow(f, 1.7) * 0.26;
  float lightVal = 0.86 + pow(f, 1.9) * 0.11;
  float val = mix(lightVal, darkVal, uDark);

  float peak = pow(smoothstep(0.62, 1.0, f), 3.0);
  val += peak * mix(0.04, 0.16, uDark);

  vec3 col = hsv2rgb(vec3(baseHue + hueShift, sat, val));

  float vig = 1.0 - smoothstep(0.85, 1.55, length(uv));
  vec3 edge = mix(vec3(0.93, 0.94, 0.96), vec3(0.055, 0.05, 0.075), uDark);
  col = mix(edge, col, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

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

    // Lower resolution on mobile — the heavy FBM doesn't need full res on small screens
    const isMobile = window.innerWidth < 1024;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderScale = isMobile ? 0.5 : 1;
    const activeOpacity = isMobile ? "0.7" : "1";

    const resize = () => {
      canvas.width  = Math.round(canvas.clientWidth * renderScale);
      canvas.height = Math.round(canvas.clientHeight * renderScale);
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

    canvas.style.opacity = activeOpacity;

    if (reduced) {
      gl.uniform1f(timeLoc, 0);
      gl.uniform2f(mouseLoc, canvas.width / 2, canvas.height / 2);
      gl.uniform1f(darkLoc, isDark() ? 1.0 : 0.0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        ro.disconnect();
        gl.deleteProgram(program);
        gl.deleteBuffer(buf);
      };
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-dvh w-screen"
    />
  );
};

export default AetherFlow;
