import { motion } from "framer-motion";
import LocalizedLink from "@/components/LocalizedLink";
import {
  Globe,
  ShoppingCart,
  Search,
  Smartphone,
  PenTool,
  Palette,
  BarChart3,
  Server,
  Headphones,
  ArrowRight,
  Mail,
  CheckCircle2,
} from "lucide-react";
import WizionarHeader from "@/components/wizionar/WizionarHeader";
import WizionarFooter from "@/components/wizionar/WizionarFooter";
import SEOHead from "@/components/wizionar/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUslugeTranslations } from "@/hooks/useUslugeTranslations";
import {
  SEO_PATHS,
  createBreadcrumbSchema,
  createServiceSchema,
  createWebPageSchema,
  getPageSeo,
  getSeoLabel,
} from "@/lib/seo";

const serviceIcons = [Globe, ShoppingCart, Search, Smartphone, PenTool, Palette, BarChart3, Server, Headphones];
const serviceLinks = [
  "/usluge/izrada-web-stranica",
  "/usluge/izrada-web-stranica",
  "/usluge/seo-optimizacija",
  null,
  null,
  "/usluge/graficki-dizajn",
  null,
  null,
  null,
];

const Usluge = () => {
  const t = useUslugeTranslations();
  const { language } = useLanguage();
  const seo = getPageSeo("usluge", language);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={seo.title}
        description={seo.description}
        schema={[
          createServiceSchema({
            language,
            name: seo.title,
            description: seo.description,
            path: SEO_PATHS.usluge,
            serviceType: seo.title,
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.usluge,
            title: seo.title,
            description: seo.description,
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
          ]),
        ]}
      />
      <WizionarHeader />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4"
            >
              {t.hero.badge}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              {t.hero.title1} <br />
              <span className="text-gradient">{t.hero.titleHighlight}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              href="mailto:info@wizionar.com"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              <Mail className="w-5 h-5" />
              {t.hero.cta}
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </section>

        {/* Services grid */}
        <section className="pb-32">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {t.services.map((service, index) => {
                const Icon = serviceIcons[index];
                const link = serviceLinks[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold leading-tight">{service.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-grow">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {link && (
                      <LocalizedLink
                        to={link}
                        className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:gap-2 transition-all mt-auto"
                      >
                        {t.learnMore} <ArrowRight className="w-4 h-4" />
                      </LocalizedLink>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 text-center"
            >
              <p className="text-muted-foreground mb-4">
                {t.cta.text}
              </p>
              <a
                href="mailto:info@wizionar.com"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                <Mail className="w-5 h-5" />
                info@wizionar.com
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <WizionarFooter />
    </div>
  );
};

export default Usluge;
