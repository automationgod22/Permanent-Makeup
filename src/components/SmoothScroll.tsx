"use client";

import Lenis from "lenis";
import { useEffect } from "react";

let instance: Lenis | null = null;

/** The active Lenis instance, if smooth scrolling is running. */
export function getLenis() {
  return instance;
}

/** Inertial scrolling on desktop. Honors prefers-reduced-motion; touch keeps native scrolling. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    instance = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: -72 }, respectReducedMotion: true });
    return () => {
      instance?.destroy();
      instance = null;
    };
  }, []);
  return null;
}
