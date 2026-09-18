import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

/**
 * Tracks the pointer inside an element and exposes it as `--mx` / `--my`
 * custom properties, which the `.v2-spotlight` utility renders as a glow.
 */
export const useSpotlight = () => {
  return useCallback((event: MouseEvent<HTMLElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();

    element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    element.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);
};

/** Counts up to `target` the first time the element scrolls into view. */
export const useCountUp = (target: number, duration = 1600) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || hasRun.current) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setValue(target);
      hasRun.current = true;
      return;
    }

    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting || hasRun.current) {
          return;
        }

        hasRun.current = true;
        observer.disconnect();

        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // easeOutExpo keeps the last digits from crawling
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

          setValue(Math.round(target * eased));

          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          }
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [duration, target]);

  return { ref, value };
};
