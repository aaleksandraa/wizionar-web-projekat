import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Shield, BarChart3, Clock } from "lucide-react";
import { useWizflussiTranslations } from "@/hooks/useWizflussiTranslations";

const HeroSection = () => {
  const t = useWizflussiTranslations();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-wf-background">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-dark-hero" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wf-border to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wf-border bg-wf-secondary/50 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span className="text-sm text-wf-muted-foreground">{t.hero.badge}</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-wf-foreground"
          >
            {t.hero.title}{" "}
            <span className="text-gradient-emerald">{t.hero.titleHighlight}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-wf-muted-foreground max-w-2xl mx-auto mb-10"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="https://flusso.wizionar.app/login" target="_blank" rel="noopener noreferrer">
                {t.hero.cta1}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#solution">{t.hero.cta2}</a>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-wf-secondary/30 border border-wf-border/50">
              <Shield className="w-5 h-5 text-emerald" />
              <span className="text-sm text-wf-muted-foreground">{t.hero.trust.rbac}</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-wf-secondary/30 border border-wf-border/50">
              <BarChart3 className="w-5 h-5 text-emerald" />
              <span className="text-sm text-wf-muted-foreground">{t.hero.trust.analytics}</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-wf-secondary/30 border border-wf-border/50">
              <Clock className="w-5 h-5 text-emerald" />
              <span className="text-sm text-wf-muted-foreground">{t.hero.trust.deadlines}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

