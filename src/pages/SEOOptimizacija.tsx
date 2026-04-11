import { motion } from "framer-motion";
import LocalizedLink from "@/components/LocalizedLink";
import {
  Search,
  TrendingUp,
  Target,
  FileText,
  Link2,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Mail,
  Shield,
  Users,
  Settings,
  PenTool,
} from "lucide-react";
import WizionarHeader from "@/components/wizionar/WizionarHeader";
import WizionarFooter from "@/components/wizionar/WizionarFooter";
import SEOHead from "@/components/wizionar/SEOHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoTranslations } from "@/hooks/useSeoTranslations";
import {
  SEO_PATHS,
  createBreadcrumbSchema,
  createFaqSchema,
  createServiceSchema,
  createWebPageSchema,
  getPageSeo,
  getSeoLabel,
} from "@/lib/seo";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const meaningIcons = [Users, Target, TrendingUp, Shield];
const approachIcons = [Search, Target, FileText, Settings, PenTool, Link2, MapPin];

const SEOOptimizacija = () => {
  const t = useSeoTranslations();
  const { language } = useLanguage();
  const seo = getPageSeo("seoOptimization", language);

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
            path: SEO_PATHS.seoOptimization,
            serviceType: getSeoLabel(language, "seo"),
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.seoOptimization,
            title: seo.title,
            description: seo.description,
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
            { name: getSeoLabel(language, "seo"), path: SEO_PATHS.seoOptimization },
          ]),
          createFaqSchema(t.faq.items.map((item) => ({ question: item.q, answer: item.a }))),
        ]}
      />
      <WizionarHeader />
      <main>
        {/* ─── HERO ─── */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            >
              <Search className="w-4 h-4" />
              {t.hero.badge}
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              {t.hero.title1}{" "}
              <span className="text-gradient">{t.hero.titleHighlight}</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="text-xl md:text-2xl font-semibold text-foreground mb-8"
            >
              {t.hero.subtitleBold}
            </motion.p>

            <motion.a
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
              href="mailto:info@wizionar.com?subject=SEO%20analiza"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow"
            >
              {t.hero.cta}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </section>

        {/* ─── STRATEŠKI KONTEKST ─── */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-5 text-lg text-muted-foreground leading-relaxed"
            >
              <p>
                {t.context.p1}{" "}
                <strong className="text-foreground">{t.context.p1Bold}</strong>{" "}
                {t.context.p1End}
              </p>
              <p>
                {t.context.p2}{" "}
                <strong className="text-foreground">{t.context.p2Bold}</strong>.
              </p>
              <p>
                {t.context.p3}{" "}
                <strong className="text-foreground">{t.context.p3Bold}</strong>.
              </p>
              <p className="text-foreground font-medium text-xl border-l-4 border-primary pl-5">
                {t.context.quote}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── ŠTA SEO ZNAČI ─── */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.meaning.title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t.meaning.subtitle}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {t.meaning.items.map((text, i) => {
                const Icon = meaningIcons[i];
                return (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                    className="flex items-start gap-4 p-6 rounded-2xl border border-border bg-card"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-foreground font-medium">{text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── NAŠ PRISTUP ─── */}
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.approach.title}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t.approach.subtitle}
              </p>
            </motion.div>

            <div className="space-y-8">
              {t.approach.steps.map((step, i) => {
                const Icon = approachIcons[i];
                const num = String(i + 1).padStart(2, "0");
                return (
                  <motion.div
                    key={num}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i * 0.5}
                    className="group p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-start gap-5">
                      <span className="text-3xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors leading-none">
                        {num}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold">{step.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">{step.desc}</p>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {step.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        {step.examples && (
                          <div className="mt-4 p-4 rounded-xl bg-secondary/50">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                              {step.examplesLabel}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {step.examples.map((ex) => (
                                <span
                                  key={ex}
                                  className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium"
                                >
                                  {ex}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── NE RADIMO SEO RADI SEO-A ─── */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                {t.notForSeo.title}
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-2xl border border-destructive/20 bg-destructive/5">
                  <p className="font-semibold text-destructive mb-3">
                    {t.notForSeo.notLabel}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {t.notForSeo.notItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5">
                  <p className="font-semibold text-primary mb-3">
                    {t.notForSeo.yesLabel}
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    {t.notForSeo.yesItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-lg text-muted-foreground font-medium">
                {t.notForSeo.bottom}{" "}
                <span className="text-foreground">{t.notForSeo.bottomBold}</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── PROCES ─── */}
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.process.title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t.process.subtitle}
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-[23px] top-0 bottom-0 w-px bg-border hidden md:block" />
              <div className="space-y-6">
                {t.process.steps.map((step, i) => (
                  <motion.div
                    key={step}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                    className="flex items-center gap-5"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0 text-primary font-bold text-sm relative z-10">
                      {i + 1}
                    </div>
                    <p className="text-foreground font-medium text-lg">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── ZAŠTO WIZIONAR ─── */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.whyUs.title}
              </h2>
            </motion.div>

            <div className="space-y-4">
              {t.whyUs.items.map((item, i) => (
                <motion.div
                  key={item}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-foreground font-medium">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.faq.title}
              </h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {t.faq.items.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border rounded-xl px-6 bg-card"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-6 max-w-2xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-xl text-muted-foreground mb-2">
                {t.cta.pre}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                {t.cta.title}{" "}
                <span className="text-gradient">{t.cta.titleHighlight}</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:info@wizionar.com?subject=SEO%20analiza"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow"
                >
                  <Mail className="w-5 h-5" />
                  {t.cta.button}
                </a>
                <LocalizedLink
                  to="/usluge"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary transition-colors"
                >
                  {t.cta.allServices}
                  <ArrowRight className="w-4 h-4" />
                </LocalizedLink>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <WizionarFooter />
    </div>
  );
};

export default SEOOptimizacija;
