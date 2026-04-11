import { motion } from "framer-motion";
import { Database, Zap, Shield, FileDown, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TrustSignals = () => {
  const { t } = useLanguage();

  const signals = [
    { icon: Database, label: t.trust.centralization },
    { icon: Zap, label: t.trust.automation },
    { icon: Shield, label: t.trust.rbac },
    { icon: FileDown, label: t.trust.export },
    { icon: Layers, label: t.trust.modular },
  ];

  return (
    <section id="trust" className="py-12 border-y border-border bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
        >
          {signals.map((signal, index) => (
            <motion.div
              key={signal.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-background border border-border hover:border-primary/30 transition-colors"
            >
              <signal.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{signal.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignals;
