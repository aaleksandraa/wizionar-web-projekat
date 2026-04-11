import { motion } from "framer-motion";
import { FileSpreadsheet, AlertTriangle, Clock, Eye, Lock } from "lucide-react";
import { useWizflussiTranslations } from "@/hooks/useWizflussiTranslations";

const ProblemSection = () => {
  const t = useWizflussiTranslations();

  const problems = [
    { icon: FileSpreadsheet, ...t.problem.items.documentation },
    { icon: AlertTriangle, ...t.problem.items.errors },
    { icon: Clock, ...t.problem.items.deadlines },
    { icon: Eye, ...t.problem.items.cashflow },
    { icon: Lock, ...t.problem.items.control }
  ];

  return (
    <section id="problem" className="py-24 relative bg-wf-background">
      <div className="absolute inset-0 bg-gradient-to-b from-wf-background via-wf-secondary/20 to-wf-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-emerald text-sm font-medium uppercase tracking-wider">{t.problem.label}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-wf-foreground">
            {t.problem.title}
          </h2>
          <p className="text-wf-muted-foreground max-w-2xl mx-auto">
            {t.problem.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-wf-card border border-wf-border hover:border-destructive/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-wf-foreground">{problem.title}</h3>
              <p className="text-wf-muted-foreground text-sm leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

