import { motion } from "framer-motion";
import { ArrowRight, Check, Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocalizedLink from "@/components/LocalizedLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { getV2Translations } from "@/lib/v2-translations";
import { PROJECT_INQUIRY_PATH } from "@/lib/project-inquiry-schema";

const V2CTA = () => {
  const { t, language } = useLanguage();
  const v2 = getV2Translations(language);

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="v2-aurora absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="v2-orb absolute left-1/2 top-1/4 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 bg-primary/20"
        aria-hidden="true"
      />
      <div className="v2-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.12]" aria-hidden="true" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65 }}
          className="v2-frame v2-frame-static v2-glass relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-border/60 p-8 text-center md:p-14"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            {v2.cta.label}
          </span>

          <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(1.9rem,4.5vw,3.25rem)] font-bold leading-[1.1]">
            {v2.cta.title}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {v2.cta.subtitle}
          </p>

          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              size="xl"
              className="group rounded-full shadow-orange transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-glow"
              asChild
            >
              <LocalizedLink to={PROJECT_INQUIRY_PATH}>
                {v2.cta.primary}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </LocalizedLink>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="v2-glass rounded-full border-border/70 transition-transform duration-300 hover:-translate-y-0.5"
              asChild
            >
              <a href="https://wa.me/38766882702" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="h-4 w-4 text-primary" />
                {v2.cta.secondary}
              </a>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {v2.cta.guarantees.map((guarantee) => (
              <li key={guarantee} className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                <Check className="h-3.5 w-3.5 text-primary" />
                {guarantee}
              </li>
            ))}
          </ul>

          {/* Direct channels */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <a
              href="mailto:info@wizionar.com"
              className="v2-frame group rounded-2xl border border-border/60 bg-background/40 p-5 text-left transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <p className="text-xs text-muted-foreground">{t.contact.emailLabel}</p>
              <p className="mt-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                {t.contact.email}
              </p>
            </a>

            <a
              href="https://wa.me/38766882702"
              target="_blank"
              rel="noopener noreferrer"
              className="v2-frame group rounded-2xl border border-border/60 bg-background/40 p-5 text-left transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                <Phone className="h-5 w-5" />
              </div>
              <p className="text-xs text-muted-foreground">{t.contact.phoneLabel}</p>
              <p className="mt-1 text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                {t.contact.phone}
              </p>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default V2CTA;
