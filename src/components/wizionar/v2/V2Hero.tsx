import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Briefcase, Sparkles, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocalizedLink from "@/components/LocalizedLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { getV2Translations } from "@/lib/v2-translations";
import { PROJECT_INQUIRY_PATH } from "@/lib/project-inquiry-schema";
import { useCountUp } from "./v2-hooks";

const BAR_HEIGHTS = [38, 62, 44, 78, 56, 88, 66, 82, 58, 94, 72, 86];

const ORBIT_CHIPS = ["WizFlussi", "wizMedik", "Chatko", "Frizerino", "WizBank", "WizVet"];

type StatProps = {
  label: string;
  value: number;
  suffix?: string;
  delta: string;
};

const HeroStat = ({ label, value, suffix = "", delta }: StatProps) => {
  const { ref, value: current } = useCountUp(value);

  return (
    <div className="rounded-2xl border border-border/70 bg-background/60 p-4 backdrop-blur-sm">
      <div className="mb-1 text-[0.7rem] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="flex items-end gap-2">
        <span ref={ref} className="text-2xl font-bold tabular-nums text-foreground md:text-3xl">
          {current}
          {suffix}
        </span>
        <span className="mb-1 text-xs font-semibold text-primary">{delta}</span>
      </div>
    </div>
  );
};

const V2Hero = () => {
  const { t, language } = useLanguage();
  const v2 = getV2Translations(language);
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const [pointerEnabled, setPointerEnabled] = useState(false);

  // Pointer-tracked spotlight over the whole hero (fine pointers only).
  useEffect(() => {
    const element = heroRef.current;

    if (!element || typeof window === "undefined") {
      return;
    }

    const finePointer = window.matchMedia?.("(pointer: fine)").matches;

    if (!finePointer || reduceMotion) {
      return;
    }

    setPointerEnabled(true);

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--hero-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      element.style.setProperty("--hero-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    };

    element.addEventListener("pointermove", onMove);

    return () => element.removeEventListener("pointermove", onMove);
  }, [reduceMotion]);

  const headlineWords = [
    ...v2.hero.titleTop.split(" ").map((word) => ({ word, highlight: false })),
    ...v2.hero.titleHighlight.split(" ").map((word) => ({ word, highlight: true })),
    ...v2.hero.titleBottom.split(" ").map((word) => ({ word, highlight: false })),
  ];

  const stats = [
    { label: t.hero.stats.projects, value: 12, delta: "+3" },
    { label: t.hero.stats.clients, value: 48, delta: "+7" },
    { label: t.hero.stats.automations, value: 156, delta: "+24" },
    { label: t.hero.stats.savings, value: 340, suffix: "h", delta: "+45" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 md:pt-32"
    >
      {/* Background stack */}
      <div className="v2-aurora absolute inset-0 -z-10" aria-hidden="true" />
      <div className="v2-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="v2-orb absolute -left-40 top-[-10%] -z-10 h-64 w-64 bg-primary/20 md:h-[26rem] md:w-[26rem] md:bg-primary/25"
        aria-hidden="true"
      />
      <div
        className="v2-orb absolute -right-32 top-1/3 -z-10 h-56 w-56 bg-[hsla(268,85%,60%,0.16)] md:h-[22rem] md:w-[22rem] md:bg-[hsla(268,85%,60%,0.28)]"
        style={{ animationDelay: "-8s" }}
        aria-hidden="true"
      />
      <div
        className="v2-grid-floor absolute inset-x-0 bottom-0 -z-10 h-72"
        aria-hidden="true"
      />
      {pointerEnabled && (
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-70 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(28rem circle at var(--hero-x, 50%) var(--hero-y, 35%), hsla(20, 95%, 60%, 0.12), transparent 65%)",
          }}
          aria-hidden="true"
        />
      )}
      <div className="v2-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.15]" aria-hidden="true" />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="v2-frame v2-frame-static v2-glass inline-flex items-center gap-2.5 rounded-full px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="v2-pulse-ring absolute inline-flex h-full w-full rounded-full bg-primary" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-medium tracking-wide text-foreground/90 sm:text-sm">
                {v2.hero.badge}
              </span>
            </div>
          </motion.div>

          {/* Kinetic headline */}
          <h1 className="mx-auto mt-8 max-w-5xl text-center text-[clamp(2.25rem,7vw,4.75rem)] font-bold leading-[1.05] tracking-tight">
            {headlineWords.map((item, index) => (
              <Fragment key={`${item.word}-${index}`}>
                <motion.span
                  initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.15 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block ${item.highlight ? "v2-text-gradient" : ""}`}
                >
                  {item.word}
                </motion.span>{" "}
              </Fragment>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-7 max-w-2xl text-center text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {v2.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="xl"
              className="group rounded-full shadow-orange transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-glow"
              asChild
            >
              <LocalizedLink to={PROJECT_INQUIRY_PATH}>
                {v2.hero.primaryCta}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </LocalizedLink>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="v2-glass group rounded-full border-border/70 transition-transform duration-300 hover:-translate-y-0.5"
              asChild
            >
              <a href="#products">
                <Sparkles className="h-4 w-4 text-primary" />
                {v2.hero.secondaryCta}
              </a>
            </Button>
            <Button
              variant="ghost"
              size="xl"
              className="group rounded-full text-muted-foreground hover:text-foreground"
              asChild
            >
              <LocalizedLink to="/usluge">
                <Briefcase className="h-4 w-4" />
                {v2.hero.tertiaryCta}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </LocalizedLink>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-6 text-center text-xs text-muted-foreground sm:text-sm"
          >
            {v2.hero.micro}
          </motion.p>

          {/* Control-center console */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-16 max-w-4xl"
            style={{ perspective: "1200px" }}
          >
            {/* Orbiting product chips (decorative, desktop only) */}
            <div
              className="pointer-events-none absolute inset-0 hidden lg:block"
              aria-hidden="true"
            >
              <div className="v2-orbit absolute inset-[-3.5rem]">
                {ORBIT_CHIPS.map((chip, index) => {
                  const angle = (index / ORBIT_CHIPS.length) * Math.PI * 2;

                  return (
                    <span
                      key={chip}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        transform: `translate(-50%, -50%) translate(${Math.cos(angle) * 52}%, ${
                          Math.sin(angle) * 52
                        }%)`,
                      }}
                    >
                      <span className="v2-orbit-counter inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.65rem] font-medium tracking-wide text-muted-foreground backdrop-blur-sm">
                        {chip}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="v2-frame v2-frame-static v2-glass relative overflow-hidden rounded-[1.75rem] border border-border/60 p-2 shadow-2xl">
              <div className="v2-scanline pointer-events-none absolute inset-x-0 top-0 h-24" aria-hidden="true" />

              <div className="rounded-[1.35rem] bg-background/70 p-5 md:p-7">
                {/* Console chrome */}
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald/70" />
                  </div>
                  <div className="truncate font-mono text-[0.7rem] text-muted-foreground">
                    {v2.hero.consoleTitle}
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    <span className="text-[0.6rem] font-semibold tracking-widest text-primary">
                      {v2.hero.live}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {stats.map((stat) => (
                    <HeroStat key={stat.label} {...stat} />
                  ))}
                </div>

                {/* Activity chart */}
                <div className="flex h-36 items-end gap-1.5 rounded-2xl border border-border/70 bg-background/50 p-4 md:gap-2">
                  {BAR_HEIGHTS.map((height, index) => (
                    <div
                      key={index}
                      className="v2-bar flex-1 rounded-t bg-gradient-to-t from-primary/25 to-primary/70"
                      style={{
                        height: `${height}%`,
                        animationDelay: `${index * 0.12}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-10 flex items-center justify-center gap-2 text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground"
          >
            <MousePointer2 className="h-3.5 w-3.5" />
            {v2.hero.scroll}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default V2Hero;
