import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Monitor, Rocket, Search, Settings, TestTube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getV2Translations } from "@/lib/v2-translations";

const V2Process = () => {
  const { t, language } = useLanguage();
  const v2 = getV2Translations(language);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 60%"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const steps = [
    { icon: Search, step: "01", ...t.process.steps.discovery },
    { icon: Monitor, step: "02", ...t.process.steps.demo },
    { icon: Settings, step: "03", ...t.process.steps.setup },
    { icon: TestTube, step: "04", ...t.process.steps.testing },
    { icon: Rocket, step: "05", ...t.process.steps.golive },
  ];

  return (
    <section id="process" className="relative overflow-hidden py-24 md:py-32">
      <div
        className="v2-orb absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 bg-primary/10"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            {t.process.label}
          </span>
          <h2 className="mt-5 text-[clamp(1.9rem,4.5vw,3.25rem)] font-bold leading-[1.1]">
            {t.process.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.process.subtitle}
          </p>
        </motion.div>

        <div ref={trackRef} className="relative mx-auto max-w-3xl">
          {/* Rail */}
          <div className="absolute bottom-4 left-[1.4rem] top-4 w-px bg-border/70 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: progress }}
            className="absolute bottom-4 left-[1.4rem] top-4 w-px origin-top bg-gradient-to-b from-primary via-accent to-primary md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-8 md:space-y-12">
            {steps.map((item, index) => (
              <motion.li
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className={`relative flex items-start gap-5 pl-0 md:w-[calc(50%-2.5rem)] ${
                  index % 2 === 0 ? "md:mr-auto md:flex-row-reverse md:text-right" : "md:ml-auto"
                }`}
              >
                {/* Node */}
                <span
                  className={`absolute left-0 top-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/30 bg-background text-primary shadow-[0_0_25px_hsla(20,95%,55%,0.25)] md:static md:shrink-0`}
                >
                  <item.icon className="h-5 w-5" />
                </span>

                <div className="v2-frame v2-frame-static ml-16 flex-1 rounded-3xl border border-border/60 bg-background/45 p-5 md:ml-0 md:p-6">
                  <div className="mb-1.5 font-mono text-xs tracking-widest text-primary">{item.step}</div>
                  <h3 className="mb-1.5 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-14 max-w-xl text-center text-sm text-muted-foreground"
        >
          {v2.process.note}
        </motion.p>
      </div>
    </section>
  );
};

export default V2Process;
