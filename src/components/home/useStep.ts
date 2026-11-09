"use client";

import { useEffect, useState } from "react";

/** Cycles 0..count-1 while playing. Reduced motion settles on the complete frame. */
export function useStep(count: number, playing = true, ms = 1800) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(Math.max(0, count - 1));
      return;
    }
    if (!playing) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % count), ms);
    return () => window.clearInterval(id);
  }, [count, playing, ms]);

  return step;
}
