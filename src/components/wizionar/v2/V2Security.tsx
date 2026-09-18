import { motion } from "framer-motion";
import { Check, Fingerprint, Lock, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const V2Security = () => {
  const { t } = useLanguage();

  const features = [
    t.security.features.rbac,
    t.security.features.audit,
    t.security.features.protection,
    t.security.features.backup,
    t.security.features.gdpr,
    t.security.features.encryption,
  ];

  return (
    <section id="security" className="relative overflow-hidden py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Shield visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />

            {[0, 1, 2].map((ring) => (
              <span
                key={ring}
                className="absolute rounded-full border border-primary/20"
                style={{
                  inset: `${ring * 14}%`,
                  animation: `v2-orbit ${28 + ring * 10}s linear infinite ${ring % 2 ? "reverse" : "normal"}`,
                }}
                aria-hidden="true"
              >
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/70" />
              </span>
            ))}

            <div className="v2-glass relative flex h-28 w-28 items-center justify-center rounded-3xl border border-primary/30 text-primary shadow-glow">
              <ShieldCheck className="h-12 w-12" />
            </div>

            <span className="absolute left-2 top-8 flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-[0.65rem] font-medium text-muted-foreground backdrop-blur-sm">
              <Lock className="h-3 w-3 text-primary" /> TLS · encryption at rest
            </span>
            <span className="absolute bottom-10 right-0 flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-[0.65rem] font-medium text-muted-foreground backdrop-blur-sm">
              <Fingerprint className="h-3 w-3 text-primary" /> RBAC · audit trail
            </span>
          </motion.div>

          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                {t.security.label}
              </span>
              <h2 className="mt-5 text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.1]">
                {t.security.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                {t.security.subtitle}
              </p>
            </motion.div>

            <ul className="mt-9 grid gap-3 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="v2-frame flex items-center gap-3 rounded-2xl border border-border/60 bg-background/45 px-4 py-3.5 transition-colors hover:border-primary/30"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default V2Security;
