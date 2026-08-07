import { motion } from "framer-motion";
import LocalizedLink from "@/components/LocalizedLink";
import {
  Globe,
  ShoppingCart,
  Search,
  Smartphone,
  PenTool,
  BarChart3,
  Shield,
  ArrowRight,
  Mail,
  CheckCircle2,
  Monitor,
  Layers,
  Zap,
  Code2,
  FileText,
  Users,
  Target,
  TrendingUp,
  Clock,
  ChevronDown,
  ExternalLink,
  Star,
  MessageSquare,
  Phone,
  CreditCard,
  Truck,
  Tag,
  Settings,
  ClipboardList,
  Filter,
  LayoutGrid,
  Languages,
  Image,
  Lock,
  Wrench,
} from "lucide-react";
import WizionarHeader from "@/components/wizionar/WizionarHeader";
import WizionarFooter from "@/components/wizionar/WizionarFooter";
import SEOHead from "@/components/wizionar/SEOHead";
import { useState } from "react";
import { useWebdevTranslations } from "@/hooks/useWebdevTranslations";
import { useLanguage } from "@/contexts/LanguageContext";
import { portfolioProjects, type PortfolioProjectData } from "@/pages/ProjectDetail";
import {
  SEO_PATHS,
  createBreadcrumbSchema,
  createFaqSchema,
  createServiceSchema,
  createWebPageSchema,
  getPageSeo,
  getSeoLabel,
} from "@/lib/seo";

import portfolioRestaurant from "@/assets/portfolio-restaurant.jpg";
import portfolioSalon from "@/assets/portfolio-salon.jpg";
import portfolioRealestate from "@/assets/portfolio-realestate.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const siteTypeIcons = [Monitor, Layers, Target, FileText, ShoppingCart];
const whyNeededIcons = [Globe, Star, TrendingUp];
const whatYouGetIcons = [
  PenTool,
  Smartphone,
  Search,
  Zap,
  MessageSquare,
  Code2,
  FileText,
  Languages,
  CreditCard,
  Settings,
  BarChart3,
  Lock,
  Wrench,
  Image,
];
const shopIcons = [LayoutGrid, Filter, ShoppingCart, CreditCard, Truck, Tag, Settings, ClipboardList];
const resultIcons = [Phone, MessageSquare, ShoppingCart, Star, Users, TrendingUp];
const advantageIcons = [Star, Target, Users, TrendingUp, Clock, Shield];

type PortfolioCard = {
  image: string;
  title: string;
  link: string;
  summary: Record<"sr" | "en" | "de" | "it", string>;
};

const placeholderPortfolio: PortfolioCard[] = [
  {
    image: portfolioRestaurant,
    title: "GastroPress Restoran",
    link: "#",
    summary: {
      sr: "Web sajt za restoran sa digitalnim menijem i online narudžbama.",
      en: "Restaurant website with digital menu and online orders.",
      de: "Restaurant-Website mit digitalem Menü und Online-Bestellungen.",
      it: "Sito web per ristorante con menù digitale e ordini online.",
    },
  },
  {
    image: portfolioSalon,
    title: "BeautyGlow Salon",
    link: "#",
    summary: {
      sr: "Elegantna prezentacija kozmetičkog salona sa sistemom rezervacija.",
      en: "Elegant cosmetic salon presentation with a booking system.",
      de: "Elegante Präsentation eines Kosmetiksalons mit Buchungssystem.",
      it: "Elegante presentazione di un salone di bellezza con sistema di prenotazione.",
    },
  },
  {
    image: portfolioRealestate,
    title: "PropertyVista Nekretnine",
    link: "#",
    summary: {
      sr: "Portal za nekretnine sa mapom, filterima i detaljnim listinzima.",
      en: "Real estate portal with map, filters and detailed listings.",
      de: "Immobilienportal mit Karte, Filtern und detaillierten Inseraten.",
      it: "Portale immobiliare con mappa, filtri e inserzioni dettagliate.",
    },
  },
];

const toPortfolioCard = (project: PortfolioProjectData): PortfolioCard => ({
  image: project.image,
  title: project.title,
  link: `/portfolio/${project.slug}`,
  summary: project.summary,
});

const portfolioData: PortfolioCard[] = [
  ...portfolioProjects.map(toPortfolioCard),
  ...placeholderPortfolio,
];

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-secondary/50"
      >
        <span className="pr-4 font-semibold">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <div className="px-5 pb-5 leading-relaxed text-muted-foreground">{a}</div>}
    </div>
  );
};

const WebDevelopment = () => {
  const t = useWebdevTranslations();
  const { language } = useLanguage();
  const seo = getPageSeo("webDevelopment", language);

  const lang = (language as "sr" | "en" | "de" | "it") || "sr";

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
            path: SEO_PATHS.webDevelopment,
            serviceType: getSeoLabel(language, "webDevelopment"),
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.webDevelopment,
            title: seo.title,
            description: seo.description,
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
            { name: getSeoLabel(language, "webDevelopment"), path: SEO_PATHS.webDevelopment },
          ]),
          createFaqSchema(t.faq.items.map((item) => ({ question: item.q, answer: item.a }))),
        ]}
      />
      <WizionarHeader />
      <main>
        <section className="relative overflow-hidden pb-24 pt-32">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute right-0 top-1/3 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
          <div className="container relative z-10 mx-auto px-6">
            <div className="mx-auto max-w-4xl text-center">
              <motion.span
                {...fadeUp}
                className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary"
              >
                {t.hero.badge}
              </motion.span>
              <motion.h1
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
              >
                {t.hero.title1} <span className="text-gradient">{t.hero.titleHighlight}</span>
              </motion.h1>
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl"
              >
                {t.hero.subtitle}
              </motion.p>
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col justify-center gap-4 sm:flex-row"
              >
                <LocalizedLink
                  to="/projektni-upitnik"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <ClipboardList className="h-5 w-5" />
                  {t.hero.cta1}
                </LocalizedLink>
                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-8 py-4 font-semibold transition-colors hover:bg-secondary"
                >
                  {t.hero.cta2}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 text-sm text-muted-foreground"
              >
                {t.hero.microcopy}
              </motion.p>
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-24">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                {t.whyNeeded.title} <span className="text-gradient">{t.whyNeeded.titleHighlight}</span>{" "}
                {t.whyNeeded.titleEnd}
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{t.whyNeeded.subtitle}</p>
            </motion.div>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              {t.whyNeeded.items.map((item, index) => {
                const Icon = whyNeededIcons[index];

                return (
                  <motion.div
                    key={item.title}
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-2xl border border-border bg-card p-6"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                    </div>
                    <p className="leading-relaxed text-muted-foreground">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="mb-16 text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                {t.siteTypes.badge}
              </span>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t.siteTypes.title}</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t.siteTypes.subtitle}</p>
            </motion.div>
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {t.siteTypes.items.map((item, index) => {
                const Icon = siteTypeIcons[index];

                return (
                  <motion.div
                    key={item.title}
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-24">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t.cmsVsCustom.title}</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t.cmsVsCustom.subtitle}</p>
            </motion.div>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
              <motion.div
                {...fadeUp}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-border bg-card p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{t.cmsVsCustom.cms.title}</h3>
                </div>
                <p className="mb-4 text-sm font-medium text-primary">{t.cmsVsCustom.cms.badge}</p>
                <p className="mb-6 leading-relaxed text-muted-foreground">{t.cmsVsCustom.cms.desc}</p>
                <ul className="space-y-2">
                  {t.cmsVsCustom.cms.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                {...fadeUp}
                transition={{ delay: 0.2 }}
                className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-8"
              >
                <div className="absolute right-4 top-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {t.cmsVsCustom.custom.label}
                  </span>
                </div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Code2 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{t.cmsVsCustom.custom.title}</h3>
                </div>
                <p className="mb-4 text-sm font-medium text-primary">{t.cmsVsCustom.custom.badge}</p>
                <p className="mb-6 leading-relaxed text-muted-foreground">{t.cmsVsCustom.custom.desc}</p>
                <ul className="space-y-2">
                  {t.cmsVsCustom.custom.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t.whatYouGet.title}</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t.whatYouGet.subtitle}</p>
            </motion.div>
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {t.whatYouGet.items.map((label, index) => {
                const Icon = whatYouGetIcons[index];

                return (
                  <motion.div
                    key={label}
                    {...fadeUp}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/20"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium">{label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-24">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="mb-16 text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                {t.shop.badge}
              </span>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t.shop.title}</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t.shop.subtitle}</p>
            </motion.div>
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
              {t.shop.items.map((item, index) => {
                const Icon = shopIcons[index];

                return (
                  <motion.div
                    key={item.label}
                    {...fadeUp}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/20 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-bold">{item.label}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <motion.div {...fadeUp} className="mb-12 text-center">
                <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                  {t.results.title1} <br />
                  {t.results.title2} <span className="text-gradient">{t.results.titleHighlight}</span>
                </h2>
              </motion.div>
              <motion.div {...fadeUp} className="grid gap-6 md:grid-cols-2">
                {t.results.items.map((text, index) => {
                  const Icon = resultIcons[index];

                  return (
                    <motion.div
                      key={text}
                      {...fadeUp}
                      transition={{ delay: index * 0.06 }}
                      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{text}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-24">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="mb-16 text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                {t.process.badge}
              </span>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t.process.title}</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t.process.subtitle}</p>
            </motion.div>
            <div className="mx-auto max-w-4xl space-y-6">
              {t.process.steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex gap-6 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/20"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <span className="text-lg font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">{step.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t.advantages.title}</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t.advantages.subtitle}</p>
            </motion.div>
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {t.advantages.items.map((item, index) => {
                const Icon = advantageIcons[index];

                return (
                  <motion.div
                    key={item.title}
                    {...fadeUp}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-lg"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="portfolio" className="bg-secondary/30 py-24">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="mb-16 text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                {t.portfolio.badge}
              </span>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t.portfolio.title}</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t.portfolio.subtitle}</p>
            </motion.div>
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {portfolioData.map((item, index) => (
                <motion.div
                  key={item.title}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/20 hover:shadow-lg"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-1 font-bold">{item.title}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{item.summary[lang]}</p>
                    {item.link !== "#" && (
                      <LocalizedLink
                        to={item.link}
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        {t.portfolio.visitSite}
                        <ExternalLink className="h-3 w-3" />
                      </LocalizedLink>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t.faq.title}</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t.faq.subtitle}</p>
            </motion.div>
            <div className="mx-auto max-w-3xl space-y-3">
              {t.faq.items.map((item, index) => (
                <motion.div key={item.q} {...fadeUp} transition={{ duration: 0.4, delay: index * 0.05 }}>
                  <FaqItem q={item.q} a={item.a} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-24">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                {t.cta.title} <span className="text-gradient">{t.cta.titleHighlight}</span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{t.cta.subtitle}</p>
              <div className="mb-6 flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <a
                    href="mailto:info@wizionar.com"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <Mail className="h-5 w-5" />
                    {t.cta.email}
                  </a>
                  <a
                    href="tel:+38762000000"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-8 py-4 font-semibold transition-colors hover:bg-secondary"
                  >
                    <Phone className="h-5 w-5" />
                    {t.cta.phone}
                  </a>
                </div>
                <LocalizedLink
                  to="/projektni-upitnik"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <ClipboardList className="h-5 w-5" />
                  {t.cta.quote}
                </LocalizedLink>
              </div>
              <p className="text-sm text-muted-foreground">{t.cta.microcopy}</p>
            </motion.div>
          </div>
        </section>
      </main>
      <WizionarFooter />
    </div>
  );
};

export default WebDevelopment;
