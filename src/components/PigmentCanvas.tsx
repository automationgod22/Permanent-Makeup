"use client";

import { useEffect, useRef, useState } from "react";

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

// Domain-warped noise in the studio palette. The pointer stirs the pigment.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseAmt;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ v += a*noise(p); p = p*2.02 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv * vec2(uRes.x/uRes.y, 1.0) * 1.6;
  float t = uTime * 0.045;

  vec2 m = uMouse * vec2(uRes.x/uRes.y, 1.0) * 1.6;
  float d = distance(p, m);
  float stir = uMouseAmt * exp(-d*d*2.2);

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 4.0*q + vec2(1.7, 9.2) + 0.6*t + stir*1.4), fbm(p + 4.0*q + vec2(8.3, 2.8) - 0.4*t - stir));
  float f = fbm(p + 4.0*r);

  vec3 inkDeep = vec3(0.114, 0.071, 0.094);
  vec3 ink     = vec3(0.165, 0.114, 0.141);
  vec3 plum    = vec3(0.31, 0.21, 0.247);
  vec3 taupe   = vec3(0.56, 0.416, 0.384);
  vec3 lip     = vec3(0.85, 0.67, 0.61);

  float sheen = pow(clamp((r.x - 0.38) * 2.4, 0.0, 1.0), 2.0);
  float k = clamp(f*0.9 + sheen*0.45 + stir*0.25, 0.0, 1.0);
  vec3 col = mix(inkDeep, ink, smoothstep(0.0, 0.45, k));
  col = mix(col, plum, smoothstep(0.45, 0.7, k));
  col = mix(col, taupe, smoothstep(0.7, 0.88, k));
  col = mix(col, lip, smoothstep(0.88, 1.0, k));

  // keep the left side (headline) calmer and darker
  col = mix(col, inkDeep, smoothstep(0.55, 0.0, uv.x) * 0.55);
  // vignette
  col *= 1.0 - 0.35 * pow(distance(uv, vec2(0.6, 0.5)), 2.0);
  gl_FragColor = vec4(col, 1.0);
}`;

export function PigmentCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uMouseAmt = gl.getUniformLocation(prog, "uMouseAmt");

    // Render below device resolution: the image is soft by nature and this keeps it light.
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6;
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const mouse = { x: 0.72, y: 0.5, tx: 0.72, ty: 0.5, amt: 0, tamt: 0 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
      mouse.tamt = 1;
    };
    const onLeave = () => (mouse.tamt = 0);

    let raf = 0;
    let visible = true;
    const start = performance.now();
    const frame = (now: number) => {
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      mouse.amt += (mouse.tamt - mouse.amt) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 12 : (now - start) / 1000 + 12);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMouseAmt, mouse.amt);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduced) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    frame(performance.now());
    setReady(true);
    if (!reduced) window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`${className} transition-opacity duration-[1.6s] ${ready ? "opacity-100" : "opacity-0"}`}
    />
  );
}
