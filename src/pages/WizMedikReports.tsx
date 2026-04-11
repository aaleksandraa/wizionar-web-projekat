import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LocalizedLink from "@/components/LocalizedLink";
import { 
  ArrowRight, Users, BarChart3, FileText, 
  DollarSign, Clock, Shield, Stethoscope,
  AlertTriangle, Calendar, TrendingUp, Building2,
  Lock, Eye, FileCheck, Activity
} from "lucide-react";
import LanguageSwitcher from "@/components/wizionar/LanguageSwitcher";
import SEOHead from "@/components/wizionar/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWizmedikReportsTranslations } from "@/hooks/useWizmedikReportsTranslations";
import {
  SEO_PATHS,
  createBreadcrumbSchema,
  createSoftwareApplicationSchema,
  createWebPageSchema,
  getPageSeo,
  getSeoLabel,
} from "@/lib/seo";

const WizMedikReports = () => {
  const t = useWizmedikReportsTranslations();
  const { language } = useLanguage();
  const seo = getPageSeo("wizmedikReports", language);

  return (
    <div className="wizmedik-reports-theme min-h-screen bg-background text-foreground">
      <SEOHead
        title={seo.title}
        description={seo.description}
        schema={[
          createSoftwareApplicationSchema({
            language,
            name: "WizMedikReports",
            description: seo.description,
            path: SEO_PATHS.wizmedikReports,
            category: "BusinessApplication",
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.wizmedikReports,
            title: seo.title,
            description: seo.description,
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: "WizMedikReports", path: SEO_PATHS.wizmedikReports },
          ]),
        ]}
      />
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-wmr-border bg-wmr-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <LocalizedLink to="/wizmedik-reports" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan flex items-center justify-center">
              <span className="text-wmr-background font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-wmr-foreground">WizMedikReports</span>
          </LocalizedLink>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#problem" className="text-sm text-wmr-muted-foreground hover:text-wmr-foreground transition-colors">
              {t.header.problem}
            </a>
            <a href="#solution" className="text-sm text-wmr-muted-foreground hover:text-wmr-foreground transition-colors">
              {t.header.solution}
            </a>
            <a href="#features" className="text-sm text-wmr-muted-foreground hover:text-wmr-foreground transition-colors">
              {t.header.features}
            </a>
            <LocalizedLink to="/" className="text-sm text-cyan hover:text-cyan-glow transition-colors">
              {t.header.backToWizionar}
            </LocalizedLink>
          </nav>

          <LanguageSwitcher />
        </div>
      </motion.header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-wmr-background">
          <div className="absolute inset-0 bg-gradient-cyan-hero" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan/10 rounded-full blur-[120px] animate-pulse" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wmr-border bg-wmr-secondary/50 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                <span className="text-sm text-wmr-muted-foreground">{t.hero.badge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-wmr-foreground"
              >
                {t.hero.title}{" "}
                <span className="text-gradient-cyan">{t.hero.titleHighlight}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-wmr-muted-foreground max-w-2xl mx-auto mb-10"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              >
                <Button size="xl" className="group bg-cyan hover:bg-cyan-glow text-wmr-background" asChild>
                  <a href="#contact">
                    {t.hero.cta1}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button variant="outline" size="xl" className="border-wmr-border text-wmr-foreground hover:bg-wmr-secondary" asChild>
                  <a href="#solution">{t.hero.cta2}</a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
              >
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-wmr-secondary/30 border border-wmr-border/50">
                  <Users className="w-5 h-5 text-cyan" />
                  <span className="text-sm text-wmr-muted-foreground">{t.hero.trust.staff}</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-wmr-secondary/30 border border-wmr-border/50">
                  <BarChart3 className="w-5 h-5 text-cyan" />
                  <span className="text-sm text-wmr-muted-foreground">{t.hero.trust.analytics}</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-wmr-secondary/30 border border-wmr-border/50">
                  <FileText className="w-5 h-5 text-cyan" />
                  <span className="text-sm text-wmr-muted-foreground">{t.hero.trust.reports}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="py-24 bg-wmr-card">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block text-cyan text-sm font-semibold uppercase tracking-wider mb-4">{t.problem.label}</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wmr-foreground">{t.problem.title}</h2>
              <p className="text-wmr-muted-foreground max-w-2xl mx-auto">{t.problem.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: DollarSign, ...t.problem.items.tracking },
                { icon: Clock, ...t.problem.items.staff },
                { icon: FileText, ...t.problem.items.reports },
                { icon: AlertTriangle, ...t.problem.items.fragmented },
                { icon: TrendingUp, ...t.problem.items.analysis }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-wmr-secondary/50 border border-wmr-border"
                >
                  <item.icon className="w-8 h-8 text-cyan mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-wmr-foreground">{item.title}</h3>
                  <p className="text-sm text-wmr-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className="py-24 bg-wmr-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block text-cyan text-sm font-semibold uppercase tracking-wider mb-4">{t.solution.label}</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wmr-foreground">{t.solution.title}</h2>
              <p className="text-wmr-muted-foreground max-w-2xl mx-auto">{t.solution.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { icon: BarChart3, ...t.solution.items.centralized },
                { icon: Users, ...t.solution.items.staff },
                { icon: FileText, ...t.solution.items.automated },
                { icon: TrendingUp, ...t.solution.items.analytics }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-wmr-card border border-wmr-border hover:border-cyan/50 transition-colors"
                >
                  <item.icon className="w-8 h-8 text-cyan mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-wmr-foreground">{item.title}</h3>
                  <p className="text-sm text-wmr-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-wmr-card">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block text-cyan text-sm font-semibold uppercase tracking-wider mb-4">{t.features.label}</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wmr-foreground">{t.features.title}</h2>
              <p className="text-wmr-muted-foreground max-w-2xl mx-auto">{t.features.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { icon: DollarSign, ...t.features.items.revenue },
                { icon: Users, ...t.features.items.staff },
                { icon: Clock, ...t.features.items.hours },
                { icon: Activity, ...t.features.items.norms },
                { icon: Calendar, ...t.features.items.daily },
                { icon: FileText, ...t.features.items.weekly },
                { icon: FileCheck, ...t.features.items.monthly },
                { icon: TrendingUp, ...t.features.items.analytics }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 rounded-xl bg-wmr-background border border-wmr-border"
                >
                  <item.icon className="w-6 h-6 text-cyan mb-3" />
                  <h3 className="text-base font-semibold mb-2 text-wmr-foreground">{item.title}</h3>
                  <p className="text-xs text-wmr-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-24 bg-wmr-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wmr-foreground">{t.cta.title}</h2>
              <p className="text-wmr-muted-foreground mb-8">{t.cta.subtitle}</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-cyan hover:bg-cyan-glow text-wmr-background" asChild>
                  <a href="mailto:info@wizionar.com">{t.cta.contact}</a>
                </Button>
              </div>

              <div className="mt-8 p-6 rounded-xl bg-wmr-card border border-wmr-border inline-block">
                <p className="text-sm text-wmr-muted-foreground mb-2">{t.cta.pricing.customization}</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-cyan">{t.cta.pricing.salePrice}</span>
                  <span className="text-lg text-wmr-muted-foreground line-through">{t.cta.pricing.regularPrice}</span>
                </div>
                <p className="text-xs text-wmr-muted-foreground mt-1">{t.cta.pricing.oneTime}</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-wmr-border bg-wmr-background">
        <div className="container mx-auto px-6 text-center">
          <LocalizedLink to="/" className="text-cyan hover:text-cyan-glow transition-colors">
            ← {t.footer.wizionar}
          </LocalizedLink>
        </div>
      </footer>
    </div>
  );
};

export default WizMedikReports;

