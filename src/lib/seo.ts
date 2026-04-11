import type { Language } from "@/lib/translations";
import { buildLangPath } from "@/lib/localized-paths";

export const BASE_URL = "https://wizionar.app";
export const SITE_NAME = "Wizionar";
export const DEFAULT_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export const SUPPORTED_LANGUAGES = ["sr", "en", "de", "it"] as const satisfies readonly Language[];

export const LANGUAGE_SEO = {
  sr: { hreflang: "bs-BA", ogLocale: "bs_BA", htmlLang: "bs-BA" },
  en: { hreflang: "en", ogLocale: "en_US", htmlLang: "en" },
  de: { hreflang: "de-DE", ogLocale: "de_DE", htmlLang: "de-DE" },
  it: { hreflang: "it-IT", ogLocale: "it_IT", htmlLang: "it-IT" },
} as const satisfies Record<Language, { hreflang: string; ogLocale: string; htmlLang: string }>;

export const SEO_PATHS = {
  home: "/",
  wizflussi: "/wizflussi",
  wizmedikReports: "/wizmedik-reports",
  wizmedik: "/wizmedik",
  frizerino: "/frizerino",
  chatko: "/chatko",
  usluge: "/usluge",
  webDevelopment: "/usluge/izrada-web-stranica",
  seoOptimization: "/usluge/seo-optimizacija",
  graphicDesign: "/usluge/graficki-dizajn",
} as const;

type SeoPageKey = keyof typeof SEO_PATHS;

type SeoPageContent = {
  title: string;
  description: string;
  keywords?: string[];
};

type BreadcrumbLabelKey = "home" | "services" | "webDevelopment" | "seo" | "graphicDesign" | "portfolio";

const SEO_LABELS: Record<Language, Record<BreadcrumbLabelKey, string>> = {
  sr: {
    home: "Početna",
    services: "Usluge",
    webDevelopment: "Izrada web stranica",
    seo: "SEO optimizacija",
    graphicDesign: "Grafički dizajn",
    portfolio: "Portfolio",
  },
  en: {
    home: "Home",
    services: "Services",
    webDevelopment: "Website Development",
    seo: "SEO Optimization",
    graphicDesign: "Graphic Design",
    portfolio: "Portfolio",
  },
  de: {
    home: "Startseite",
    services: "Leistungen",
    webDevelopment: "Webentwicklung",
    seo: "SEO-Optimierung",
    graphicDesign: "Grafikdesign",
    portfolio: "Portfolio",
  },
  it: {
    home: "Home",
    services: "Servizi",
    webDevelopment: "Sviluppo web",
    seo: "Ottimizzazione SEO",
    graphicDesign: "Design grafico",
    portfolio: "Portfolio",
  },
};

const PAGE_SEO: Record<SeoPageKey, Record<Language, SeoPageContent>> = {
  home: {
    sr: {
      title: "Poslovne aplikacije, web razvoj i SEO | Wizionar",
      description:
        "Wizionar razvija poslovne aplikacije, web stranice, web shopove, SEO strategije i grafički dizajn za firme u BiH, Njemačkoj i Italiji.",
      keywords: [
        "poslovne aplikacije",
        "izrada web stranica",
        "web shop development",
        "seo optimizacija",
        "grafički dizajn",
        "B2B softver",
      ],
    },
    en: {
      title: "Business Software, Web Development & SEO | Wizionar",
      description:
        "Wizionar builds business software, websites, web shops, SEO strategies and design systems for companies targeting Bosnia, Germany and Italy.",
      keywords: [
        "business software",
        "website development",
        "web shop development",
        "SEO agency",
        "graphic design",
        "B2B software",
      ],
    },
    de: {
      title: "Business-Software, Webentwicklung & SEO | Wizionar",
      description:
        "Wizionar entwickelt Business-Software, Websites, Webshops, SEO-Strategien und Designsysteme für Unternehmen in Bosnien, Deutschland und Italien.",
      keywords: [
        "Business-Software",
        "Webentwicklung",
        "Webshop Entwicklung",
        "SEO Agentur",
        "Grafikdesign",
        "B2B Software",
      ],
    },
    it: {
      title: "Software aziendale, sviluppo web e SEO | Wizionar",
      description:
        "Wizionar realizza software aziendale, siti web, web shop, strategie SEO e design per aziende che operano in Bosnia, Germania e Italia.",
      keywords: [
        "software aziendale",
        "sviluppo siti web",
        "sviluppo web shop",
        "agenzia SEO",
        "design grafico",
        "software B2B",
      ],
    },
  },
  wizflussi: {
    sr: {
      title: "WizFlussi | Upravljanje plaćanjima dobavljačima",
      description:
        "WizFlussi centralizuje plaćanja dobavljačima, rokove, valute i audit trag za timove kojima trebaju kontrola, pregled i automatizacija.",
    },
    en: {
      title: "WizFlussi | Supplier Payment Management",
      description:
        "WizFlussi centralizes supplier payments, due dates, currencies and audit trails for teams that need control, visibility and automation.",
    },
    de: {
      title: "WizFlussi | Lieferantenzahlungen digital verwalten",
      description:
        "WizFlussi zentralisiert Lieferantenzahlungen, Fristen, Währungen und Audit-Trails für Teams mit Fokus auf Kontrolle und Automatisierung.",
    },
    it: {
      title: "WizFlussi | Gestione pagamenti fornitori",
      description:
        "WizFlussi centralizza pagamenti fornitori, scadenze, valute e audit trail per team che cercano controllo, visibilità e automazione.",
    },
  },
  wizmedikReports: {
    sr: {
      title: "WizMedikReports | Izvještaji za klinike i ustanove",
      description:
        "WizMedikReports donosi centralizovane izvještaje, praćenje radnih sati i finansijsku analitiku za klinike i zdravstvene ustanove.",
    },
    en: {
      title: "WizMedikReports | Reporting for Clinics",
      description:
        "WizMedikReports provides centralized reporting, staff time tracking and financial analytics for clinics and healthcare organizations.",
    },
    de: {
      title: "WizMedikReports | Reporting für Kliniken",
      description:
        "WizMedikReports bietet zentrale Reports, Zeiterfassung und Finanzanalytik für Kliniken und Gesundheitseinrichtungen.",
    },
    it: {
      title: "WizMedikReports | Report per cliniche",
      description:
        "WizMedikReports offre report centralizzati, monitoraggio orari e analisi finanziaria per cliniche e strutture sanitarie.",
    },
  },
  wizmedik: {
    sr: {
      title: "WizMedik | Platforma za klinike i online zakazivanje",
      description:
        "WizMedik povezuje klinike, doktore i pacijente kroz pretragu, profile ustanova, online zakazivanje i pouzdane medicinske informacije.",
    },
    en: {
      title: "WizMedik | Clinic Platform & Online Booking",
      description:
        "WizMedik connects clinics, doctors and patients through search, facility profiles, online booking and trusted medical content.",
    },
    de: {
      title: "WizMedik | Plattform für Kliniken und Terminbuchung",
      description:
        "WizMedik verbindet Kliniken, Ärzte und Patienten über Suche, Praxisprofile, Online-Terminbuchung und verlässliche Inhalte.",
    },
    it: {
      title: "WizMedik | Piattaforma cliniche e prenotazioni online",
      description:
        "WizMedik collega cliniche, medici e pazienti tramite ricerca, profili delle strutture, prenotazioni online e contenuti affidabili.",
    },
  },
  frizerino: {
    sr: {
      title: "Frizerino | Rezervacije i upravljanje salonima",
      description:
        "Frizerino pomaže salonima da dobiju više rezervacija, manje propuštenih termina i jasniji pregled rasporeda, usluga i tima.",
    },
    en: {
      title: "Frizerino | Salon Booking & Management",
      description:
        "Frizerino helps salons increase bookings, reduce missed appointments and manage schedules, services and teams more efficiently.",
    },
    de: {
      title: "Frizerino | Buchungen und Salonverwaltung",
      description:
        "Frizerino hilft Salons, mehr Buchungen zu erhalten, Ausfälle zu reduzieren und Termine, Services und Teams besser zu verwalten.",
    },
    it: {
      title: "Frizerino | Prenotazioni e gestione saloni",
      description:
        "Frizerino aiuta i saloni ad aumentare le prenotazioni, ridurre gli appuntamenti persi e gestire meglio agenda, servizi e team.",
    },
  },
  chatko: {
    sr: {
      title: "Chatko | AI asistent za web shopove",
      description:
        "Chatko je AI asistent za web shopove koji odgovara na pitanja o proizvodima, dostavi, plaćanju i kupovini bez opterećenja vašeg tima.",
    },
    en: {
      title: "Chatko | AI Assistant for Web Shops",
      description:
        "Chatko is an AI assistant for e-commerce stores that answers questions about products, delivery, payments and purchases around the clock.",
    },
    de: {
      title: "Chatko | KI-Assistent für Webshops",
      description:
        "Chatko ist ein KI-Assistent für Webshops, der Fragen zu Produkten, Lieferung, Bezahlung und Kaufprozessen automatisch beantwortet.",
    },
    it: {
      title: "Chatko | Assistente AI per web shop",
      description:
        "Chatko è un assistente AI per e-commerce che risponde automaticamente a domande su prodotti, consegna, pagamenti e acquisti.",
    },
  },
  usluge: {
    sr: {
      title: "Digitalne usluge: web development, SEO i dizajn | Wizionar",
      description:
        "Web razvoj, SEO optimizacija i grafički dizajn za kompanije koje žele bolju vidljivost, više upita i profesionalniji nastup na tržištu.",
    },
    en: {
      title: "Digital Services: Web Development, SEO & Design | Wizionar",
      description:
        "Web development, SEO optimization and graphic design for companies that want stronger visibility, more leads and a sharper market presence.",
    },
    de: {
      title: "Digitale Services: Webentwicklung, SEO und Design | Wizionar",
      description:
        "Webentwicklung, SEO-Optimierung und Grafikdesign für Unternehmen, die mehr Sichtbarkeit, Anfragen und einen professionellen Auftritt wollen.",
    },
    it: {
      title: "Servizi digitali: sviluppo web, SEO e design | Wizionar",
      description:
        "Sviluppo web, ottimizzazione SEO e design grafico per aziende che desiderano più visibilità, più richieste e una presenza più forte.",
    },
  },
  webDevelopment: {
    sr: {
      title: "Izrada web stranica i web shopova | Wizionar",
      description:
        "Profesionalna izrada web stranica, landing stranica i web shopova. Moderan dizajn, brze performanse i SEO osnova za rast.",
    },
    en: {
      title: "Website & Web Shop Development | Wizionar",
      description:
        "Professional website, landing page and web shop development with modern design, strong performance and a solid SEO foundation.",
    },
    de: {
      title: "Websites und Webshops entwickeln lassen | Wizionar",
      description:
        "Professionelle Entwicklung von Websites, Landing Pages und Webshops mit modernem Design, Performance und sauberer SEO-Basis.",
    },
    it: {
      title: "Sviluppo siti web e web shop | Wizionar",
      description:
        "Sviluppo professionale di siti web, landing page e web shop con design moderno, prestazioni veloci e base SEO solida.",
    },
  },
  seoOptimization: {
    sr: {
      title: "SEO optimizacija | Wizionar",
      description:
        "SEO optimizacija za dugoročni rast: više relevantnih posjeta, više upita i jaču organsku vidljivost na domaćem, njemačkom i italijanskom tržištu.",
    },
    en: {
      title: "SEO Optimization | Wizionar",
      description:
        "SEO optimization for long-term growth, stronger organic visibility and more qualified leads across local and international markets.",
    },
    de: {
      title: "SEO-Optimierung | Wizionar",
      description:
        "SEO-Optimierung für langfristiges Wachstum, mehr qualifizierte Anfragen und bessere organische Sichtbarkeit in lokalen und internationalen Märkten.",
    },
    it: {
      title: "Ottimizzazione SEO | Wizionar",
      description:
        "Ottimizzazione SEO per crescita duratura, maggiore visibilità organica e più richieste qualificate nei mercati locali e internazionali.",
    },
  },
  graphicDesign: {
    sr: {
      title: "Grafički dizajn i brending | Wizionar",
      description:
        "Grafički dizajn, vizuelni identitet, ambalaža, social media vizuali i promotivni materijali za brendove koji žele ostaviti jači utisak.",
    },
    en: {
      title: "Graphic Design & Branding | Wizionar",
      description:
        "Graphic design, visual identity, packaging, social media creatives and promotional materials for brands that want a stronger visual impact.",
    },
    de: {
      title: "Grafikdesign und Branding | Wizionar",
      description:
        "Grafikdesign, visuelle Identität, Packaging, Social-Media-Grafiken und Werbematerialien für Marken mit Anspruch auf starke Wirkung.",
    },
    it: {
      title: "Design grafico e branding | Wizionar",
      description:
        "Design grafico, identità visiva, packaging, creatività social e materiali promozionali per brand che vogliono distinguersi.",
    },
  },
};

export type SchemaObject = Record<string, unknown>;

export const toAbsoluteUrl = (path: string) => new URL(path, BASE_URL).toString();

export const getPageSeo = (page: SeoPageKey, language: Language) => PAGE_SEO[page][language];

export const getSeoLabel = (language: Language, key: BreadcrumbLabelKey) => SEO_LABELS[language][key];

const withContext = (schema: SchemaObject) => ({
  "@context": "https://schema.org",
  ...schema,
});

export const createOrganizationSchema = () =>
  withContext({
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: SITE_NAME,
    url: BASE_URL,
    email: "info@wizionar.com",
    telephone: "+38766882702",
    areaServed: ["BA", "DE", "IT", "EU"],
    availableLanguage: ["bs", "en", "de", "it"],
    knowsAbout: [
      "Business software",
      "Web development",
      "SEO",
      "Graphic design",
      "E-commerce",
      "Healthcare platforms",
    ],
  });

export const createWebsiteSchema = (language: Language) =>
  withContext({
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SITE_NAME,
    inLanguage: LANGUAGE_SEO[language].htmlLang,
    publisher: { "@id": `${BASE_URL}/#organization` },
  });

export const createWebPageSchema = ({
  language,
  path,
  title,
  description,
}: {
  language: Language;
  path: string;
  title: string;
  description: string;
}) =>
  withContext({
    "@type": "WebPage",
    "@id": `${toAbsoluteUrl(buildLangPath(path, language))}#webpage`,
    url: toAbsoluteUrl(buildLangPath(path, language)),
    name: title,
    description,
    inLanguage: LANGUAGE_SEO[language].htmlLang,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
  });

export const createServiceSchema = ({
  language,
  name,
  description,
  path,
  serviceType,
}: {
  language: Language;
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) =>
  withContext({
    "@type": "Service",
    "@id": `${toAbsoluteUrl(buildLangPath(path, language))}#service`,
    name,
    description,
    serviceType,
    url: toAbsoluteUrl(buildLangPath(path, language)),
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: ["BA", "DE", "IT", "EU"],
    availableLanguage: ["bs", "en", "de", "it"],
  });

export const createSoftwareApplicationSchema = ({
  language,
  name,
  description,
  path,
  category,
  keywords,
}: {
  language: Language;
  name: string;
  description: string;
  path: string;
  category: string;
  keywords?: string[];
}) =>
  withContext({
    "@type": "SoftwareApplication",
    "@id": `${toAbsoluteUrl(buildLangPath(path, language))}#app`,
    name,
    description,
    applicationCategory: category,
    operatingSystem: "Web",
    url: toAbsoluteUrl(buildLangPath(path, language)),
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: LANGUAGE_SEO[language].htmlLang,
    keywords,
  });

export const createCreativeWorkSchema = ({
  language,
  name,
  description,
  path,
  keywords,
}: {
  language: Language;
  name: string;
  description: string;
  path: string;
  keywords?: string[];
}) =>
  withContext({
    "@type": "CreativeWork",
    "@id": `${toAbsoluteUrl(buildLangPath(path, language))}#creativework`,
    name,
    description,
    url: toAbsoluteUrl(buildLangPath(path, language)),
    creator: { "@id": `${BASE_URL}/#organization` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: LANGUAGE_SEO[language].htmlLang,
    keywords,
  });

export const createBreadcrumbSchema = (
  language: Language,
  items: Array<{ name: string; path: string }>
) =>
  withContext({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(buildLangPath(item.path, language)),
    })),
  });

export const createFaqSchema = (
  items: Array<{ question: string; answer: string }>
) =>
  withContext({
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });
