import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play, Briefcase } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import { useLanguage } from "@/contexts/LanguageContext";

const WizionarHero = () => {
  const { t } = useLanguage();

  const stats = [
    { label: t.hero.stats.projects, value: "12", change: "+3" },
    { label: t.hero.stats.clients, value: "48", change: "+7" },
    { label: t.hero.stats.automations, value: "156", change: "+24" },
    { label: t.hero.stats.savings, value: "340", change: "+45" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-primary/5 rounded-full blur-[150px] opacity-60" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] opacity-40" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern-border opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-foreground">{t.hero.badge}</span>
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8"
          >
            {t.hero.title1}{" "}
            <span className="text-gradient">{t.hero.titleHighlight}</span>{" "}
            {t.hero.title2}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Button size="xl" className="group shadow-orange hover:shadow-glow transition-all duration-300" asChild>
              <a href="#contact">
                {t.hero.cta1}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="outline" size="xl" className="group" asChild>
              <a href="#products">
                <Play className="w-4 h-4 mr-1" />
                {t.hero.cta2}
              </a>
            </Button>
            <Button variant="outline" size="xl" className="group" asChild>
              <LocalizedLink to="/usluge">
                <Briefcase className="w-4 h-4 mr-1" />
                {t.hero.cta3}
              </LocalizedLink>
            </Button>
          </motion.div>

          {/* Microcopy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-sm text-muted-foreground"
          >
            {t.hero.microcopy}
          </motion.p>

          {/* Visual element - Abstract shapes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 relative"
          >
            <div className="relative mx-auto max-w-4xl">
              {/* Dashboard mockup */}
              <div className="rounded-2xl border border-border bg-card p-2 shadow-2xl">
                <div className="rounded-xl bg-secondary/50 p-6">
                  {/* Mock header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-xs text-muted-foreground">wizionar.app/dashboard</div>
                  </div>
                  
                  {/* Mock content */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                    {stats.map((stat, i) => (
                      <div key={i} className="p-4 rounded-lg bg-background border border-border">
                        <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                          <span className="text-xs text-primary font-medium mb-1">{stat.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mock chart area */}
                  <div className="h-32 rounded-lg bg-background border border-border flex items-end p-4 gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-primary/20 rounded-t transition-all hover:bg-primary/40"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/10 rounded-2xl blur-xl animate-float" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WizionarHero;

