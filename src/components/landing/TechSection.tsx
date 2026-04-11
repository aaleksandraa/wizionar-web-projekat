import { motion } from "framer-motion";
import { Server, Database, Shield, Gauge } from "lucide-react";
import { useWizflussiTranslations } from "@/hooks/useWizflussiTranslations";

const TechSection = () => {
  const t = useWizflussiTranslations();

  return (
    <section className="py-24 relative bg-wf-background">
      <div className="absolute inset-0 bg-gradient-to-b from-wf-background via-wf-muted/5 to-wf-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-emerald text-sm font-medium uppercase tracking-wider">{t.tech.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-wf-foreground">
              {t.tech.title}
            </h2>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-dark-card border border-wf-border">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Server className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-wf-foreground">{t.tech.items.laravel.title}</h4>
                    <p className="text-wf-muted-foreground text-sm">
                      {t.tech.items.laravel.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Database className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-wf-foreground">{t.tech.items.architecture.title}</h4>
                    <p className="text-wf-muted-foreground text-sm">
                      {t.tech.items.architecture.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-wf-foreground">{t.tech.items.security.title}</h4>
                    <p className="text-wf-muted-foreground text-sm">
                      {t.tech.items.security.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Gauge className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-wf-foreground">{t.tech.items.scalability.title}</h4>
                    <p className="text-wf-muted-foreground text-sm">
                      {t.tech.items.scalability.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-wf-border">
              <p className="text-center text-wf-muted-foreground text-sm">
                {t.tech.note}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechSection;

