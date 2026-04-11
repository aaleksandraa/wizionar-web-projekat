import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LocalizedLink from "@/components/LocalizedLink";
import { 
  ArrowRight, Search, MapPin, Clock, Calendar,
  Star, Bell, Users, BarChart3, Globe,
  Scissors, Shield, CheckCircle, Sparkles
} from "lucide-react";
import LanguageSwitcher from "@/components/wizionar/LanguageSwitcher";
import SEOHead from "@/components/wizionar/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFrizerinoTranslations } from "@/hooks/useFrizerinoTranslations";
import {
  SEO_PATHS,
  createBreadcrumbSchema,
  createSoftwareApplicationSchema,
  createWebPageSchema,
  getPageSeo,
  getSeoLabel,
} from "@/lib/seo";

const Frizerino = () => {
  const t = useFrizerinoTranslations();
  const { language } = useLanguage();
  const seo = getPageSeo("frizerino", language);

  return (
    <div className="frizerino-theme min-h-screen bg-background text-foreground">
      <SEOHead
        title={seo.title}
        description={seo.description}
        schema={[
          createSoftwareApplicationSchema({
            language,
            name: "Frizerino",
            description: seo.description,
            path: SEO_PATHS.frizerino,
            category: "BusinessApplication",
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.frizerino,
            title: seo.title,
            description: seo.description,
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: "Frizerino", path: SEO_PATHS.frizerino },
          ]),
        ]}
      />
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-friz-border bg-friz-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <LocalizedLink to="/frizerino" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose flex items-center justify-center">
              <Scissors className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-friz-foreground">Frizerino</span>
          </LocalizedLink>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#search" className="text-sm text-friz-muted-foreground hover:text-friz-foreground transition-colors">
              {t.header.search}
            </a>
            <a href="#system" className="text-sm text-friz-muted-foreground hover:text-friz-foreground transition-colors">
              {t.header.forSalons}
            </a>
            <a href="#about" className="text-sm text-friz-muted-foreground hover:text-friz-foreground transition-colors">
              {t.header.about}
            </a>
            <LocalizedLink to="/" className="text-sm text-rose hover:text-rose-glow transition-colors">
              {t.header.backToWizionar}
            </LocalizedLink>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button size="sm" className="hidden sm:flex bg-rose hover:bg-rose-glow text-white" asChild>
              <a href="https://frizerino.com/" target="_blank" rel="noopener noreferrer">
                {t.header.bookNow}
              </a>
            </Button>
          </div>
        </div>
      </motion.header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-friz-background">
          <div className="absolute inset-0 bg-gradient-rose-hero" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-rose/10 rounded-full blur-[120px] animate-pulse" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-friz-border bg-friz-secondary/50 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-rose animate-pulse" />
                <span className="text-sm text-friz-muted-foreground">{t.hero.badge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-friz-foreground"
              >
                {t.hero.title}{" "}
                <span className="text-gradient-rose">{t.hero.titleHighlight}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-friz-muted-foreground max-w-2xl mx-auto mb-10"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              >
                <Button size="xl" className="group bg-rose hover:bg-rose-glow text-white" asChild>
                  <a href="https://frizerino.com/" target="_blank" rel="noopener noreferrer">
                    {t.hero.cta1}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button variant="outline" size="xl" className="border-friz-border text-friz-foreground hover:bg-friz-secondary" asChild>
                  <a href="#system">{t.hero.cta2}</a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
              >
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-friz-secondary/30 border border-friz-border/50">
                  <Search className="w-5 h-5 text-rose" />
                  <span className="text-sm text-friz-muted-foreground">{t.hero.trust.search}</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-friz-secondary/30 border border-friz-border/50">
                  <Calendar className="w-5 h-5 text-rose" />
                  <span className="text-sm text-friz-muted-foreground">{t.hero.trust.booking}</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-friz-secondary/30 border border-friz-border/50">
                  <Star className="w-5 h-5 text-rose" />
                  <span className="text-sm text-friz-muted-foreground">{t.hero.trust.reviews}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section id="search" className="py-24 bg-friz-card">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block text-rose text-sm font-semibold uppercase tracking-wider mb-4">{t.search.label}</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-friz-foreground">{t.search.title}</h2>
              <p className="text-friz-muted-foreground max-w-2xl mx-auto">{t.search.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: MapPin, ...t.search.items.city },
                { icon: Search, ...t.search.items.location },
                { icon: Users, ...t.search.items.type },
                { icon: Clock, ...t.search.items.availability }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-friz-background border border-friz-border hover:border-rose/50 transition-colors"
                >
                  <item.icon className="w-8 h-8 text-rose mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-friz-foreground">{item.title}</h3>
                  <p className="text-sm text-friz-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-24 bg-friz-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block text-rose text-sm font-semibold uppercase tracking-wider mb-4">{t.booking.label}</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-friz-foreground">{t.booking.title}</h2>
              <p className="text-friz-muted-foreground max-w-2xl mx-auto">{t.booking.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Search, ...t.booking.items.find },
                { icon: Calendar, ...t.booking.items.reserve },
                { icon: Star, ...t.booking.items.reviews },
                { icon: Bell, ...t.booking.items.reminders }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-friz-card border border-friz-border"
                >
                  <item.icon className="w-8 h-8 text-rose mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-friz-foreground">{item.title}</h3>
                  <p className="text-sm text-friz-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* System Section */}
        <section id="system" className="py-24 bg-friz-card">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block text-rose text-sm font-semibold uppercase tracking-wider mb-4">{t.system.label}</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-friz-foreground">{t.system.title}</h2>
              <p className="text-friz-muted-foreground max-w-2xl mx-auto">{t.system.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Calendar, ...t.system.items.reservations },
                { icon: Clock, ...t.system.items.schedule },
                { icon: BarChart3, ...t.system.items.analytics },
                { icon: Globe, title: t.system.items.widget.title, description: t.system.items.widget.description, features: t.system.items.widget.features }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-friz-background border border-friz-border"
                >
                  <item.icon className="w-8 h-8 text-rose mb-4" />
                  <h3 className="text-lg font-semibold mb-3 text-friz-foreground">{item.title}</h3>
                  {'description' in item && (
                    <p className="text-sm text-friz-muted-foreground mb-3">{item.description}</p>
                  )}
                  <ul className="space-y-2">
                    {item.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-sm text-friz-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-rose" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-friz-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block text-rose text-sm font-semibold uppercase tracking-wider mb-4">{t.about.label}</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-friz-foreground">{t.about.title}</h2>
              <p className="text-friz-muted-foreground max-w-2xl mx-auto">{t.about.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-friz-card border border-friz-border"
              >
                <Sparkles className="w-10 h-10 text-rose mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-friz-foreground">{t.about.mission.title}</h3>
                <p className="text-friz-muted-foreground mb-4">{t.about.mission.description}</p>
                <p className="text-sm text-friz-muted-foreground">{t.about.mission.text}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-friz-card border border-friz-border"
              >
                <MapPin className="w-10 h-10 text-rose mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-friz-foreground">{t.about.local.title}</h3>
                <p className="text-friz-muted-foreground">{t.about.local.description}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-24 bg-friz-card">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block text-rose text-sm font-semibold uppercase tracking-wider mb-4">{t.security.label}</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-friz-foreground">{t.security.title}</h2>
              <p className="text-friz-muted-foreground max-w-2xl mx-auto">{t.security.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-friz-background border border-friz-border"
              >
                <Shield className="w-8 h-8 text-rose mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-friz-foreground">{t.security.items.gdpr.title}</h3>
                <p className="text-sm text-friz-muted-foreground">{t.security.items.gdpr.description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-xl bg-friz-background border border-friz-border"
              >
                <MapPin className="w-8 h-8 text-rose mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-friz-foreground">{t.security.items.local.title}</h3>
                <p className="text-sm text-friz-muted-foreground">{t.security.items.local.description}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-friz-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-friz-foreground">{t.cta.title}</h2>
              <p className="text-friz-muted-foreground mb-8">{t.cta.subtitle}</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="group bg-rose hover:bg-rose-glow text-white" asChild>
                  <a href="https://frizerino.com/" target="_blank" rel="noopener noreferrer">
                    {t.cta.visitSite}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="border-friz-border text-friz-foreground hover:bg-friz-secondary" asChild>
                  <a href="mailto:info@wizionar.com">{t.cta.contact}</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-friz-border bg-friz-background">
        <div className="container mx-auto px-6 text-center">
          <LocalizedLink to="/" className="text-rose hover:text-rose-glow transition-colors">
            ← {t.footer.wizionar}
          </LocalizedLink>
        </div>
      </footer>
    </div>
  );
};

export default Frizerino;

