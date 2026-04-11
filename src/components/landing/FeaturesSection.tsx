import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  CreditCard, 
  Users, 
  Building2, 
  CalendarClock, 
  Globe, 
  FileDown, 
  ShieldCheck 
} from "lucide-react";
import { useWizflussiTranslations } from "@/hooks/useWizflussiTranslations";

const FeaturesSection = () => {
  const t = useWizflussiTranslations();

  const features = [
    { icon: LayoutDashboard, ...t.features.items.dashboard, highlight: true },
    { icon: CreditCard, ...t.features.items.payments, highlight: false },
    { icon: Users, ...t.features.items.suppliers, highlight: false },
    { icon: Building2, ...t.features.items.branches, highlight: false },
    { icon: CalendarClock, ...t.features.items.plans, highlight: true },
    { icon: Globe, ...t.features.items.currency, highlight: false },
    { icon: FileDown, ...t.features.items.reports, highlight: false },
    { icon: ShieldCheck, ...t.features.items.rbac, highlight: true }
  ];

  return (
    <section id="features" className="py-24 relative bg-wf-background">
      <div className="absolute inset-0 bg-gradient-to-b from-wf-background via-wf-secondary/10 to-wf-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-emerald text-sm font-medium uppercase tracking-wider">{t.features.label}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-wf-foreground">
            {t.features.title}
          </h2>
          <p className="text-wf-muted-foreground max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`group p-6 rounded-2xl border transition-all duration-300 ${
                feature.highlight 
                  ? 'bg-gradient-dark-card border-emerald/30 hover:border-emerald/50 shadow-emerald-glow' 
                  : 'bg-wf-card border-wf-border hover:border-wf-muted-foreground/30'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                feature.highlight 
                  ? 'bg-emerald/20 group-hover:bg-emerald/30' 
                  : 'bg-wf-secondary group-hover:bg-wf-secondary/80'
              }`}>
                <feature.icon className={`w-6 h-6 ${feature.highlight ? 'text-emerald' : 'text-blue-500'}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-wf-foreground">{feature.title}</h3>
              <p className="text-wf-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

