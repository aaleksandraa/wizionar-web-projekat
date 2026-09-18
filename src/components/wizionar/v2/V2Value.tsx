import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  Gauge,
  KeyRound,
  Layers,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { getV2Translations } from "@/lib/v2-translations";
import { useSpotlight } from "./v2-hooks";

const V2Value = () => {
  const { t, language } = useLanguage();
  const v2 = getV2Translations(language);
  const onSpotlightMove = useSpotlight();

  const cards = [
    {
      icon: Zap,
      title: t.whatWeDo.features.automation.title,
      description: t.whatWeDo.features.automation.description,
    },
    {
      icon: ShieldCheck,
      title: t.whatWeDo.features.control.title,
      description: t.whatWeDo.features.control.description,
    },
    {
      icon: Layers,
      title: t.whatWeDo.features.scalability.title,
      description: t.whatWeDo.features.scalability.description,
    },
    { icon: Bot, title: v2.value.aiTitle, description: v2.value.aiDescription },
    { icon: Gauge, title: v2.value.speedTitle, description: v2.value.speedDescription },
    { icon: KeyRound, title: v2.value.ownershipTitle, description: v2.value.ownershipDescription },
  ];

  return (
    <section id="why" className="relative overflow-hidden py-24 md:py-32">
      <div
        className="v2-orb absolute -left-24 top-1/4 -z-10 h-80 w-80 bg-primary/10"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            {v2.value.label}
          </span>
          <h2 className="mt-5 text-[clamp(1.9rem,4.5vw,3.25rem)] font-bold leading-[1.1]">
            {v2.value.title1} <span className="v2-text-gradient">{v2.value.title2}</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.whatWeDo.description}
          </p>
        </motion.div>

        {/* Before / after split */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-16 grid max-w-5xl items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]"
        >
          <div className="rounded-3xl border border-border/60 bg-background/40 p-6 md:p-8">
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {v2.value.beforeTitle}
            </div>
            <ul className="space-y-3">
              {v2.value.before.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive">
                    <X className="h-3 w-3" />
                  </span>
                  <span className="line-through decoration-muted-foreground/40">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary md:rotate-0">
              <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0" />
            </div>
          </div>

          <div className="v2-frame v2-frame-static relative overflow-hidden rounded-3xl border border-primary/25 bg-primary/[0.06] p-6 md:p-8">
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              {v2.value.afterTitle}
            </div>
            <ul className="space-y-3">
              {v2.value.after.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
                  className="flex items-start gap-3 text-sm font-medium text-foreground"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Capability grid */}
        <div className="mx-auto mt-6 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              onMouseMove={onSpotlightMove}
              className="v2-frame v2-spotlight group relative overflow-hidden rounded-3xl border border-border/60 bg-background/40 p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative z-10">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{card.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <LocalizedLink
            to="/usluge"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            {t.whatWeDo.link}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </LocalizedLink>
        </motion.div>
      </div>
    </section>
  );
};

export default V2Value;
