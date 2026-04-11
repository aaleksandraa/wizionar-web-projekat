import { motion } from "framer-motion";
import { Zap, Eye, TrendingUp, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhatWeDo = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t.whatWeDo.features.automation.title,
      description: t.whatWeDo.features.automation.description
    },
    {
      icon: Eye,
      title: t.whatWeDo.features.control.title,
      description: t.whatWeDo.features.control.description
    },
    {
      icon: TrendingUp,
      title: t.whatWeDo.features.scalability.title,
      description: t.whatWeDo.features.scalability.description
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">{t.whatWeDo.label}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t.whatWeDo.title1}<br />
              <span className="text-gradient">{t.whatWeDo.title2}</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t.whatWeDo.description}
            </p>
            <a 
              href="#products" 
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              {t.whatWeDo.link}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right - Feature cards */}
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
