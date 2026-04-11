import { motion } from "framer-motion";
import { Building2, Factory, Calculator, Truck } from "lucide-react";
import { useWizflussiTranslations } from "@/hooks/useWizflussiTranslations";

const AudienceSection = () => {
  const t = useWizflussiTranslations();

  const audiences = [
    { icon: Building2, ...t.audience.items.medium },
    { icon: Factory, ...t.audience.items.large },
    { icon: Calculator, ...t.audience.items.accounting },
    { icon: Truck, ...t.audience.items.logistics }
  ];

  return (
    <section id="audience" className="py-24 relative bg-wf-background">
      <div className="absolute inset-0 bg-gradient-to-b from-wf-secondary/20 via-wf-background to-wf-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-emerald text-sm font-medium uppercase tracking-wider">{t.audience.label}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-wf-foreground">
            {t.audience.title}
          </h2>
          <p className="text-wf-muted-foreground max-w-2xl mx-auto">
            {t.audience.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-wf-card border border-wf-border hover:border-blue-500/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <audience.icon className="w-7 h-7 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-wf-foreground">{audience.title}</h3>
                  <p className="text-wf-muted-foreground text-sm leading-relaxed mb-4">{audience.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {audience.features.map((feature) => (
                      <span key={feature} className="px-3 py-1 rounded-full bg-wf-secondary text-xs text-wf-muted-foreground">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;

