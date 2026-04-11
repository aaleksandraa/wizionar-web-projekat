import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LocalizedLink from "@/components/LocalizedLink";
import { 
  ArrowRight, Search, MapPin, Building2, Calendar,
  Stethoscope, FlaskConical, Heart, Home, Users,
  FileText, MessageCircleQuestion, CheckCircle2, Shield
} from "lucide-react";
import LanguageSwitcher from "@/components/wizionar/LanguageSwitcher";
import SEOHead from "@/components/wizionar/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWizmedikTranslations } from "@/hooks/useWizmedikTranslations";
import {
  SEO_PATHS,
  createBreadcrumbSchema,
  createSoftwareApplicationSchema,
  createWebPageSchema,
  getPageSeo,
  getSeoLabel,
} from "@/lib/seo";

const WizMedik = () => {
  const t = useWizmedikTranslations();
  const { language } = useLanguage();
  const seo = getPageSeo("wizmedik", language);

  return (
    <div className="wizmedik-theme min-h-screen bg-background text-foreground">
      <SEOHead
        title={seo.title}
        description={seo.description}
        schema={[
          createSoftwareApplicationSchema({
            language,
            name: "WizMedik",
            description: seo.description,
            path: SEO_PATHS.wizmedik,
            category: "HealthApplication",
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.wizmedik,
            title: seo.title,
            description: seo.description,
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: "WizMedik", path: SEO_PATHS.wizmedik },
          ]),
        ]}
      />
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-wm-border bg-wm-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <LocalizedLink to="/wizmedik" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-wm-foreground">wizMedik</span>
          </LocalizedLink>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#search" className="text-sm text-wm-muted-foreground hover:text-wm-foreground transition-colors">
              {t.header.search}
            </a>
            <a href="#services" className="text-sm text-wm-muted-foreground hover:text-wm-foreground transition-colors">
              {t.header.about}
            </a>
            <a href="#blog" className="text-sm text-wm-muted-foreground hover:text-wm-foreground transition-colors">
              {t.header.blog}
            </a>
            <LocalizedLink to="/" className="text-sm text-teal hover:text-teal-glow transition-colors">
              {t.header.backToWizionar}
            </LocalizedLink>
          </nav>

          <LanguageSwitcher />
        </div>
      </motion.header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-wm-background">
          <div className="absolute inset-0 bg-gradient-teal-hero" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-teal/10 rounded-full blur-[120px] animate-pulse" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wm-border bg-wm-secondary/50 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                <span className="text-sm text-wm-muted-foreground">{t.hero.badge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-wm-foreground"
              >
                {t.hero.title}{" "}
                <span className="text-gradient-teal">{t.hero.titleHighlight}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-wm-muted-foreground max-w-2xl mx-auto mb-10"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              >
                <Button size="xl" className="group bg-teal hover:bg-teal-glow text-white" asChild>
                  <a href="#services">
                    {t.hero.cta1}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button variant="outline" size="xl" className="border-wm-border text-wm-foreground hover:bg-wm-secondary" asChild>
                  <a href="#search">{t.hero.cta2}</a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
              >
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-wm-secondary/30 border border-wm-border/50">
                  <Stethoscope className="w-5 h-5 text-teal" />
                  <span className="text-sm text-wm-muted-foreground">{t.hero.trust.doctors}</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-wm-secondary/30 border border-wm-border/50">
                  <Calendar className="w-5 h-5 text-teal" />
                  <span className="text-sm text-wm-muted-foreground">{t.hero.trust.booking}</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-wm-secondary/30 border border-wm-border/50">
                  <FileText className="w-5 h-5 text-teal" />
                  <span className="text-sm text-wm-muted-foreground">{t.hero.trust.content}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section id="search" className="py-24 bg-wm-card">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block text-teal text-sm font-semibold uppercase tracking-wider mb-4">{t.search.label}</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wm-foreground">{t.search.title}</h2>
              <p className="text-wm-muted-foreground max-w-2xl mx-auto">{t.search.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Search, ...t.search.items.specialty },
                { icon: MapPin, ...t.search.items.location },
                { icon: Building2, ...t.search.items.type },
                { icon: Calendar, ...t.search.items.availability }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-wm-background border border-wm-border hover:border-teal/50 transition-colors"
                >
                  <item.icon className="w-8 h-8 text-teal mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-wm-foreground">{item.title}</h3>
                  <p className="text-sm text-wm-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-wm-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block text-teal text-sm font-semibold uppercase tracking-wider mb-4">{t.services.label}</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wm-foreground">{t.services.title}</h2>
              <p className="text-wm-muted-foreground max-w-2xl mx-auto">{t.services.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Stethoscope, ...t.services.items.doctors },
                { icon: Building2, ...t.services.items.clinics },
                { icon: FlaskConical, ...t.services.items.labs },
                { icon: Heart, ...t.services.items.spas },
                { icon: Home, ...t.services.items.nursing },
                { icon: Calendar, ...t.services.items.booking }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-wm-card border border-wm-border hover:border-teal/50 transition-colors"
                >
                  <item.icon className="w-8 h-8 text-teal mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-wm-foreground">{item.title}</h3>
                  <p className="text-sm text-wm-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog & Q&A Section */}
        <section id="blog" className="py-24 bg-wm-card">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Blog */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-wm-background border border-wm-border"
              >
                <FileText className="w-10 h-10 text-teal mb-4" />
                <span className="inline-block text-teal text-sm font-semibold uppercase tracking-wider mb-2">{t.blog.label}</span>
                <h3 className="text-2xl font-bold mb-3 text-wm-foreground">{t.blog.title}</h3>
                <p className="text-wm-muted-foreground mb-6">{t.blog.subtitle}</p>
                <ul className="space-y-3">
                  {t.blog.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-wm-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-teal" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Q&A */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-wm-background border border-wm-border"
              >
                <MessageCircleQuestion className="w-10 h-10 text-teal mb-4" />
                <span className="inline-block text-teal text-sm font-semibold uppercase tracking-wider mb-2">{t.qa.label}</span>
                <h3 className="text-2xl font-bold mb-3 text-wm-foreground">{t.qa.title}</h3>
                <p className="text-wm-muted-foreground mb-6">{t.qa.subtitle}</p>
                <ul className="space-y-3">
                  {t.qa.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-wm-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-teal" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why wizMedik Section */}
        <section className="py-24 bg-wm-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block text-teal text-sm font-semibold uppercase tracking-wider mb-4">{t.why.label}</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wm-foreground">{t.why.title}</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Users, ...t.why.items.platform },
                { icon: Calendar, ...t.why.items.booking },
                { icon: FileText, ...t.why.items.content },
                { icon: Shield, ...t.why.items.trust }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-wm-card border border-wm-border text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-teal" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-wm-foreground">{item.title}</h3>
                  <p className="text-sm text-wm-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-wm-card">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wm-foreground">{t.cta.title}</h2>
              <p className="text-wm-muted-foreground mb-8">{t.cta.subtitle}</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-teal hover:bg-teal-glow text-white" asChild>
                  <a href="#services">{t.cta.findDoctor}</a>
                </Button>
                <Button variant="outline" size="lg" className="border-wm-border text-wm-foreground hover:bg-wm-secondary" asChild>
                  <a href="mailto:info@wizionar.com">{t.cta.contact}</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-wm-border bg-wm-background">
        <div className="container mx-auto px-6 text-center">
          <LocalizedLink to="/" className="text-teal hover:text-teal-glow transition-colors">
            ← {t.footer.wizionar}
          </LocalizedLink>
        </div>
      </footer>
    </div>
  );
};

export default WizMedik;

