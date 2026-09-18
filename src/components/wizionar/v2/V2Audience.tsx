import { motion } from "framer-motion";
import { ArrowRight, Building, Cat, HeartPulse, Landmark, Sparkles } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { PROJECT_INQUIRY_PATH } from "@/lib/project-inquiry-schema";
import { useSpotlight } from "./v2-hooks";

const V2Audience = () => {
  const { t } = useLanguage();
  const onSpotlightMove = useSpotlight();

  const audiences = [
    { icon: Landmark, ...t.forWho.audiences.finance },
    { icon: HeartPulse, ...t.forWho.audiences.health },
    { icon: Sparkles, ...t.forWho.audiences.services },
    { icon: Cat, ...t.forWho.audiences.vet },
    { icon: Building, ...t.forWho.audiences.companies },
  ];

  return (
    <section id="for-who" className="relative overflow-hidden border-y border-border/60 py-24 md:py-32">
      <div className="v2-grid absolute inset-0 -z-10 opacity-40" aria-hidden="true" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            {t.forWho.label}
          </span>
          <h2 className="mt-5 text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.1]">
            {t.forWho.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.forWho.subtitle}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
              onMouseMove={onSpotlightMove}
              className="v2-frame v2-spotlight group relative overflow-hidden rounded-3xl border border-border/60 bg-background/45 p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative z-10 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <audience.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-snug">{audience.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{audience.description}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="v2-frame v2-frame-static group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-primary/30 bg-primary/[0.08] p-6"
          >
            <p className="text-base font-semibold leading-snug">{t.forWho.link}</p>
            <LocalizedLink
              to={PROJECT_INQUIRY_PATH}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              {t.nav.requestDemo}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </LocalizedLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default V2Audience;
