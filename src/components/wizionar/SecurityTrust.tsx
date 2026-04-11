import { motion } from "framer-motion";
import { Shield, FileCheck, Lock, CheckCircle, Activity, Database } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SecurityTrust = () => {
  const { t } = useLanguage();

  const securityFeatures = [
    { icon: Shield, label: t.security.features.rbac },
    { icon: FileCheck, label: t.security.features.audit },
    { icon: Lock, label: t.security.features.protection },
    { icon: Database, label: t.security.features.backup },
    { icon: Activity, label: t.security.features.gdpr },
    { icon: CheckCircle, label: t.security.features.encryption },
  ];

  return (
    <section id="security" className="py-32 bg-foreground text-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern-light" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px] translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">{t.security.label}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t.security.title}
          </h2>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            {t.security.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-4 p-5 rounded-2xl bg-background/5 border border-background/10 backdrop-blur-sm hover:bg-background/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-background">{feature.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityTrust;

