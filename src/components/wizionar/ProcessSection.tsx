import { motion } from "framer-motion";
import { Search, Monitor, Settings, TestTube, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProcessSection = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      step: "01",
      title: t.process.steps.discovery.title,
      description: t.process.steps.discovery.description
    },
    {
      icon: Monitor,
      step: "02",
      title: t.process.steps.demo.title,
      description: t.process.steps.demo.description
    },
    {
      icon: Settings,
      step: "03",
      title: t.process.steps.setup.title,
      description: t.process.steps.setup.description
    },
    {
      icon: TestTube,
      step: "04",
      title: t.process.steps.testing.title,
      description: t.process.steps.testing.description
    },
    {
      icon: Rocket,
      step: "05",
      title: t.process.steps.golive.title,
      description: t.process.steps.golive.description
    }
  ];

  return (
    <section id="process" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">{t.process.label}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t.process.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.process.subtitle}
          </p>
        </motion.div>

        {/* Horizontal timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-border" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center lg:text-left"
              >
                {/* Step circle */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border-2 border-primary mb-6 mx-auto lg:mx-0">
                  <step.icon className="w-8 h-8 text-primary" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
