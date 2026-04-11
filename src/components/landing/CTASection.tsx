import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Tag } from "lucide-react";
import { useWizflussiTranslations } from "@/hooks/useWizflussiTranslations";

const CTASection = () => {
  const t = useWizflussiTranslations();

  return (
    <section className="py-24 relative overflow-hidden bg-wf-background">
      <div className="absolute inset-0 bg-gradient-to-b from-wf-background via-emerald/5 to-wf-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-wf-foreground">
            {t.cta.title}
          </h2>
          <p className="text-lg text-wf-muted-foreground mb-10 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="https://flusso.wizionar.app/login" target="_blank" rel="noopener noreferrer">
                {t.cta.testApp}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="mailto:info@wizionar.com">
                <Mail className="w-5 h-5" />
                {t.cta.contact}
              </a>
            </Button>
          </div>

          <div className="max-w-md mx-auto">
            <div className="text-center p-8 rounded-2xl bg-wf-card border border-wf-border">
              <Tag className="w-6 h-6 text-emerald mx-auto mb-3" />
              <div className="text-3xl font-bold text-emerald mb-3">{t.cta.pricing.salePrice}</div>
              <div className="text-sm text-wf-muted-foreground">{t.cta.pricing.customization}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

