/* eslint-disable react-refresh/only-export-components */
import { motion } from "framer-motion";
import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeft,
  CheckCircle2,
  Globe,
  Smartphone,
  Search,
  Zap,
  Code2,
  ShoppingCart,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import WizionarHeader from "@/components/wizionar/WizionarHeader";
import WizionarFooter from "@/components/wizionar/WizionarFooter";
import SEOHead from "@/components/wizionar/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  SEO_PATHS,
  createBreadcrumbSchema,
  createCreativeWorkSchema,
  createWebPageSchema,
  getSeoLabel,
} from "@/lib/seo";

import portfolioCorporate from "@/assets/portfolio-corporate.jpg";
import portfolioEshop from "@/assets/portfolio-eshop.jpg";
import portfolioMedical from "@/assets/portfolio-medical.jpg";
import portfolioRestaurant from "@/assets/portfolio-restaurant.jpg";
import portfolioSalon from "@/assets/portfolio-salon.jpg";
import portfolioRealestate from "@/assets/portfolio-realestate.jpg";
import portfolioBncWebshop from "@/assets/portfolio-bnc-webshop.jpg";
import { getBncShopArticle } from "@/lib/portfolio/bnc-shop-content";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

type Lang = "sr" | "en" | "de" | "it";

export interface PortfolioProjectData {
  slug: string;
  title: string;
  image: string;
  gallery: string[];
  client: Record<Lang, string>;
  category: Record<Lang, string>;
  summary: Record<Lang, string>;
  description: Record<Lang, string>;
  challenge: Record<Lang, string>;
  solution: Record<Lang, string>;
  features: Record<Lang, string[]>;
  technologies: string[];
  results: Record<Lang, string[]>;
  liveUrl?: string;
  layout?: "default" | "article";
}

export const portfolioProjects: PortfolioProjectData[] = [
  {
    slug: "bnc-shop",
    title: "BNC Shop",
    image: portfolioBncWebshop,
    gallery: [portfolioBncWebshop],
    liveUrl: "https://bnc.ba",
    layout: "article",
    client: {
      sr: "BNC",
      en: "BNC",
      de: "BNC",
      it: "BNC",
    },
    category: {
      sr: "Web shop",
      en: "E-commerce",
      de: "Webshop",
      it: "E-commerce",
    },
    summary: {
      sr: "Custom eCommerce platforma koja objedinjuje online prodaju, B2B poslovanje i interne procese.",
      en: "Custom eCommerce platform unifying online sales, B2B operations and internal processes.",
      de: "Maßgeschneiderte E-Commerce-Plattform, die Online-Verkauf, B2B-Geschäft und interne Prozesse vereint.",
      it: "Piattaforma eCommerce personalizzata che unifica vendite online, operazioni B2B e processi interni.",
    },
    description: {
      sr: "Razvoj custom eCommerce platforme koja objedinjuje online prodaju, B2B poslovanje i interne procese u jedinstven sistem.",
      en: "Development of a custom eCommerce platform that unifies online sales, B2B operations and internal processes into a single system.",
      de: "Entwicklung einer maßgeschneiderten E-Commerce-Plattform, die Online-Verkauf, B2B-Geschäft und interne Prozesse in einem System vereint.",
      it: "Sviluppo di una piattaforma eCommerce personalizzata che unifica vendite online, operazioni B2B e processi interni in un unico sistema.",
    },
    challenge: {
      sr: "Kako je broj proizvoda, kupaca i prodajnih kanala rastao, postojeće rješenje više nije moglo pratiti razvoj poslovanja. Veliki dio procesa zahtijevao je ručne intervencije, podaci su dolazili iz različitih sistema, a administracija je postajala sve složenija.",
      en: "As the number of products, customers and sales channels grew, the existing solution could no longer keep up with business development. Much of the process required manual intervention, data came from different systems, and administration was becoming increasingly complex.",
      de: "Mit wachsender Anzahl an Produkten, Kunden und Vertriebskanälen konnte die bestehende Lösung die Geschäftsentwicklung nicht mehr mithalten. Viele Prozesse erforderten manuelle Eingriffe, Daten kamen aus verschiedenen Systemen und die Administration wurde zunehmend komplexer.",
      it: "Con la crescita del numero di prodotti, clienti e canali di vendita, la soluzione esistente non riusciva più a tenere il passo con lo sviluppo del business. Gran parte dei processi richiedeva interventi manuali, i dati provenivano da sistemi diversi e l'amministrazione diventava sempre più complessa.",
    },
    solution: {
      sr: "Osmislili smo i razvili platformu koja ne rješava samo prodaju putem interneta, već povezuje kompletan poslovni ekosistem u jedno centralizovano rješenje — modernu eCommerce platformu sa visokim nivoom automatizacije i mogućnošću daljeg razvoja.",
      en: "We designed and developed a platform that doesn't just handle online sales, but connects the entire business ecosystem into one centralized solution — a modern eCommerce platform with a high level of automation and room to grow.",
      de: "Wir konzipierten und entwickelten eine Plattform, die nicht nur den Online-Verkauf abwickelt, sondern das gesamte Geschäftsökosystem in einer zentralen Lösung verbindet — eine moderne E-Commerce-Plattform mit hohem Automatisierungsgrad und Entwicklungspotenzial.",
      it: "Abbiamo progettato e sviluppato una piattaforma che non si limita alla vendita online, ma collega l'intero ecosistema aziendale in un'unica soluzione centralizzata — una piattaforma eCommerce moderna con alto livello di automazione e possibilità di crescita.",
    },
    features: {
      sr: [
        "Automatska sinhronizacija proizvoda i zaliha",
        "B2B portal sa prilagođenim cijenama",
        "Napredna pretraga i filtriranje",
        "Marketing alati (kuponi, promocije, akcije)",
        "Administrativni panel",
        "Sistem lojalnosti",
      ],
      en: [
        "Automatic product and stock synchronization",
        "B2B portal with custom pricing",
        "Advanced search and filtering",
        "Marketing tools (coupons, promotions, campaigns)",
        "Admin panel",
        "Loyalty system",
      ],
      de: [
        "Automatische Produkt- und Bestandssynchronisation",
        "B2B-Portal mit individuellen Preisen",
        "Erweiterte Suche und Filterung",
        "Marketing-Tools (Gutscheine, Aktionen, Kampagnen)",
        "Administrationspanel",
        "Treueprogramm",
      ],
      it: [
        "Sincronizzazione automatica prodotti e scorte",
        "Portale B2B con prezzi personalizzati",
        "Ricerca e filtri avanzati",
        "Strumenti marketing (coupon, promozioni, campagne)",
        "Pannello amministrativo",
        "Sistema fedeltà",
      ],
    },
    technologies: ["Custom Backend", "REST API", "MySQL", "ERP integracija", "Responsive Design", "SEO optimizacija"],
    results: {
      sr: [
        "Centralizovana digitalna platforma",
        "Automatizacija svakodnevnih procesa",
        "Platforma spremna za dalji rast",
      ],
      en: [
        "Centralized digital platform",
        "Automation of daily processes",
        "Platform ready for further growth",
      ],
      de: [
        "Zentralisierte digitale Plattform",
        "Automatisierung täglicher Prozesse",
        "Plattform bereit für weiteres Wachstum",
      ],
      it: [
        "Piattaforma digitale centralizzata",
        "Automazione dei processi quotidiani",
        "Piattaforma pronta per ulteriore crescita",
      ],
    },
  },
  {
    slug: "techflow-dashboard",
    title: "TechFlow Dashboard",
    image: portfolioCorporate,
    gallery: [portfolioCorporate, portfolioEshop, portfolioMedical, portfolioRestaurant],
    client: {
      sr: "TechFlow Solutions",
      en: "TechFlow Solutions",
      de: "TechFlow Solutions",
      it: "TechFlow Solutions",
    },
    category: {
      sr: "Korporativni web sajt",
      en: "Corporate website",
      de: "Unternehmenswebsite",
      it: "Sito web aziendale",
    },
    summary: {
      sr: "Korporativni dashboard sa analitikom i izvještavanjem za finansijsku kompaniju.",
      en: "Corporate dashboard with analytics and reporting for a financial company.",
      de: "Unternehmens-Dashboard mit Analytik und Reporting für ein Finanzunternehmen.",
      it: "Dashboard aziendale con analisi e reportistica per una società finanziaria.",
    },
    description: {
      sr: "Korporativni dashboard sa analitikom i izvještavanjem za finansijsku kompaniju. Kompleksan projekat koji je zahtijevao integraciju višestrukih izvora podataka i prikaz u realnom vremenu.",
      en: "Corporate dashboard with analytics and reporting for a financial company. A complex project requiring integration of multiple data sources and real-time display.",
      de: "Unternehmens-Dashboard mit Analytik und Reporting für ein Finanzunternehmen. Ein komplexes Projekt mit Integration mehrerer Datenquellen und Echtzeitanzeige.",
      it: "Dashboard aziendale con analisi e reportistica per una società finanziaria. Un progetto complesso che richiedeva l'integrazione di più fonti di dati e la visualizzazione in tempo reale.",
    },
    challenge: {
      sr: "Klijent je trebao centralizovanu platformu za praćenje svih finansijskih metrika u realnom vremenu, sa mogućnošću generisanja izvještaja i vizuelnog prikaza podataka za različite odjele.",
      en: "The client needed a centralized platform to track all financial metrics in real time, with the ability to generate reports and visually present data for different departments.",
      de: "Der Kunde benötigte eine zentrale Plattform zur Echtzeit-Verfolgung aller Finanzkennzahlen mit der Möglichkeit, Berichte zu erstellen und Daten für verschiedene Abteilungen visuell darzustellen.",
      it: "Il cliente aveva bisogno di una piattaforma centralizzata per monitorare tutte le metriche finanziarie in tempo reale, con la possibilità di generare report e visualizzare i dati per diversi dipartimenti.",
    },
    solution: {
      sr: "Razvili smo custom dashboard sa interaktivnim grafikonima, automatizovanim izvještajima i pristupom po ulogama. Platforma se integriše sa postojećim ERP sistemom klijenta.",
      en: "We developed a custom dashboard with interactive charts, automated reports and role-based access. The platform integrates with the client's existing ERP system.",
      de: "Wir entwickelten ein maßgeschneidertes Dashboard mit interaktiven Diagrammen, automatisierten Berichten und rollenbasiertem Zugriff. Die Plattform integriert sich in das bestehende ERP-System des Kunden.",
      it: "Abbiamo sviluppato una dashboard personalizzata con grafici interattivi, report automatizzati e accesso basato sui ruoli. La piattaforma si integra con il sistema ERP esistente del cliente.",
    },
    features: {
      sr: ["Real-time analitika", "Automatski izvještaji", "Pristup po ulogama", "ERP integracija", "Responsive dizajn", "Dark/Light mode"],
      en: ["Real-time analytics", "Automated reports", "Role-based access", "ERP integration", "Responsive design", "Dark/Light mode"],
      de: ["Echtzeit-Analytik", "Automatisierte Berichte", "Rollenbasierter Zugriff", "ERP-Integration", "Responsives Design", "Dark/Light-Modus"],
      it: ["Analisi in tempo reale", "Report automatizzati", "Accesso basato sui ruoli", "Integrazione ERP", "Design responsive", "Modalità Dark/Light"],
    },
    technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Supabase", "Framer Motion"],
    results: {
      sr: ["40% brže donošenje odluka", "Ušteda 15h sedmično na izvještavanju", "98% uptime platforme"],
      en: ["40% faster decision making", "Saving 15h weekly on reporting", "98% platform uptime"],
      de: ["40% schnellere Entscheidungsfindung", "15h wöchentliche Einsparung bei Berichten", "98% Plattform-Uptime"],
      it: ["40% più veloce u procesu donošenja odluka", "Risparmio di 15h settimanali nei report", "98% uptime della piattaforma"],
    },
  },
  {
    slug: "styleout-fashion-shop",
    title: "StyleOut Fashion Shop",
    image: portfolioEshop,
    gallery: [portfolioEshop, portfolioCorporate, portfolioSalon, portfolioRealestate],
    client: {
      sr: "StyleOut d.o.o.",
      en: "StyleOut Ltd.",
      de: "StyleOut GmbH",
      it: "StyleOut Srl",
    },
    category: {
      sr: "Web shop",
      en: "E-commerce",
      de: "Webshop",
      it: "E-commerce",
    },
    summary: {
      sr: "Moderan fashion web shop sa naprednim filterima i online plaćanjem.",
      en: "Modern fashion web shop with advanced filters and online payment.",
      de: "Moderner Fashion-Webshop mit erweiterten Filtern und Online-Zahlung.",
      it: "Web shop di moda moderno con filtri avanzati e pagamento online.",
    },
    description: {
      sr: "Moderan fashion web shop sa naprednim filterima, wishlist-om i online plaćanjem. Kompletan e-commerce sistem prilagođen modnoj industriji.",
      en: "Modern fashion web shop with advanced filters, wishlist and online payment. A complete e-commerce system tailored for the fashion industry.",
      de: "Moderner Fashion-Webshop mit erweiterten Filtern, Wunschliste und Online-Zahlung. Ein komplettes E-Commerce-System für die Modebranche.",
      it: "Web shop di moda moderno con filtri avanzati, wishlist e pagamento online. Un sistema e-commerce completo per l'industria della moda.",
    },
    challenge: {
      sr: "Klijent je želio premium online iskustvo kupovine sa brzim pretraživanjem, pametnim filterima i besprijekornim checkout procesom.",
      en: "The client wanted a premium online shopping experience with fast search, smart filters and a seamless checkout process.",
      de: "Der Kunde wollte ein Premium-Online-Einkaufserlebnis mit schneller Suche, intelligenten Filtern und einem nahtlosen Checkout-Prozess.",
      it: "Il cliente desiderava un'esperienza di acquisto online premium con ricerca veloce, filtri intelligenti e un processo di checkout impeccabile.",
    },
    solution: {
      sr: "Kreirali smo custom web shop sa intuitivnim UX dizajnom, naprednim filterima po kategorijama, veličinama i bojama, te integrisanim payment gateway-em.",
      en: "We created a custom web shop with intuitive UX design, advanced filters by category, size and color, and an integrated payment gateway.",
      de: "Wir erstellten einen maßgeschneiderten Webshop mit intuitivem UX-Design, erweiterten Filtern nach Kategorie, Größe und Farbe sowie einem integrierten Payment-Gateway.",
      it: "Abbiamo creato un web shop personalizzato con design UX intuitivo, filtri avanzati per categoria, taglia e colore, e un gateway di pagamento integrato.",
    },
    features: {
      sr: ["Napredni filteri", "Wishlist", "Online plaćanje", "Praćenje narudžbi", "Responsive dizajn", "SEO optimizacija"],
      en: ["Advanced filters", "Wishlist", "Online payment", "Order tracking", "Responsive design", "SEO optimization"],
      de: ["Erweiterte Filter", "Wunschliste", "Online-Zahlung", "Auftragsverfolgung", "Responsives Design", "SEO-Optimierung"],
      it: ["Filtri avanzati", "Wishlist", "Pagamento online", "Tracciamento ordini", "Design responsive", "Ottimizzazione SEO"],
    },
    technologies: ["React", "TypeScript", "Tailwind CSS", "Stripe", "Supabase", "Framer Motion"],
    results: {
      sr: ["250% rast online prodaje", "35% veća prosječna košarica", "4.8/5 korisničko iskustvo"],
      en: ["250% growth in online sales", "35% higher average cart", "4.8/5 user experience"],
      de: ["250% Wachstum im Online-Umsatz", "35% höherer durchschnittlicher Warenkorb", "4.8/5 Nutzererfahrung"],
      it: ["250% crescita nelle vendite online", "35% carrello medio più alto", "4.8/5 esperienza utente"],
    },
  },
  {
    slug: "mediconnect-klinika",
    title: "MediConnect Klinika",
    image: portfolioMedical,
    gallery: [portfolioMedical, portfolioRealestate, portfolioCorporate, portfolioSalon],
    client: {
      sr: "MediConnect Klinika",
      en: "MediConnect Clinic",
      de: "MediConnect Klinik",
      it: "Clinica MediConnect",
    },
    category: {
      sr: "Medicinska platforma",
      en: "Medical platform",
      de: "Medizinische Plattform",
      it: "Piattaforma medica",
    },
    summary: {
      sr: "Platforma za medicinsku ustanovu sa online zakazivanjem termina.",
      en: "Platform for a medical institution with online appointment scheduling.",
      de: "Plattform für eine medizinische Einrichtung mit Online-Terminbuchung.",
      it: "Piattaforma per un istituto medico con prenotazione appuntamenti online.",
    },
    description: {
      sr: "Platforma za medicinsku ustanovu sa online zakazivanjem termina, profilima doktora i informacijama o uslugama.",
      en: "Platform for a medical institution with online appointment scheduling, doctor profiles and service information.",
      de: "Plattform für eine medizinische Einrichtung mit Online-Terminbuchung, Arztprofilen und Serviceinformationen.",
      it: "Piattaforma per un istituto medico con prenotazione appuntamenti online, profili dei medici e informazioni sui servizi.",
    },
    challenge: {
      sr: "Klinika je trebala modernu web platformu koja će smanjiti broj telefonskih poziva i omogućiti pacijentima jednostavno zakazivanje termina.",
      en: "The clinic needed a modern web platform to reduce phone calls and allow patients to easily schedule appointments.",
      de: "Die Klinik benötigte eine moderne Web-Plattform, um Telefonanrufe zu reduzieren und Patienten eine einfache Terminbuchung zu ermöglichen.",
      it: "La clinica aveva bisogno di una piattaforma web moderna per ridurre le telefonate e permettere ai pazienti di prenotare facilmente gli appuntamenti.",
    },
    solution: {
      sr: "Razvili smo platformu sa online zakazivanjem, profilima doktora, sekcijom za usluge i blogom sa medicinskim savjetima.",
      en: "We developed a platform with online booking, doctor profiles, services section and a blog with medical advice.",
      de: "Wir entwickelten eine Plattform mit Online-Buchung, Arztprofilen, Servicebereich und einem Blog mit medizinischen Ratschlägen.",
      it: "Abbiamo sviluppato una piattaforma con prenotazione online, profili dei medici, sezione servizi e un blog con consigli medici.",
    },
    features: {
      sr: ["Online zakazivanje", "Profili doktora", "Blog sekcija", "Kontakt forme", "Responsive dizajn", "GDPR usklađenost"],
      en: ["Online booking", "Doctor profiles", "Blog section", "Contact forms", "Responsive design", "GDPR compliance"],
      de: ["Online-Buchung", "Arztprofile", "Blog-Bereich", "Kontaktformulare", "Responsives Design", "DSGVO-Konformität"],
      it: ["Prenotazione online", "Profili medici", "Sezione blog", "Moduli di contatto", "Design responsive", "Conformità GDPR"],
    },
    technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion", "React Hook Form"],
    results: {
      sr: ["60% manje telefonskih poziva", "3x više online zakazivanja", "92% zadovoljstvo pacijenata"],
      en: ["60% fewer phone calls", "3x more online bookings", "92% patient satisfaction"],
      de: ["60% weniger Telefonanrufe", "3x mehr Online-Buchungen", "92% Patientenzufriedenheit"],
      it: ["60% meno telefonate", "3x più prenotazioni online", "92% soddisfazione dei pazienti"],
    },
  },
];

const labels: Record<
  Lang,
  {
    back: string;
    client: string;
    category: string;
    challenge: string;
    solution: string;
    features: string;
    tech: string;
    results: string;
    cta: string;
    ctaDesc: string;
    ctaBtn: string;
    website: string;
  }
> = {
  sr: {
    back: "Nazad na portfolio",
    client: "Klijent",
    category: "Kategorija",
    challenge: "Izazov",
    solution: "Naše rješenje",
    features: "Funkcionalnosti",
    tech: "Tehnologije",
    results: "Rezultati",
    cta: "Želite sličan projekat?",
    ctaDesc: "Kontaktirajte nas i razgovarajmo o vašem projektu.",
    ctaBtn: "Kontaktirajte nas",
    website: "Web sajt",
  },
  en: {
    back: "Back to portfolio",
    client: "Client",
    category: "Category",
    challenge: "Challenge",
    solution: "Our solution",
    features: "Features",
    tech: "Technologies",
    results: "Results",
    cta: "Want a similar project?",
    ctaDesc: "Contact us and let's discuss your project.",
    ctaBtn: "Contact us",
    website: "Website",
  },
  de: {
    back: "Zurück zum Portfolio",
    client: "Kunde",
    category: "Kategorie",
    challenge: "Herausforderung",
    solution: "Unsere Lösung",
    features: "Funktionen",
    tech: "Technologien",
    results: "Ergebnisse",
    cta: "Möchten Sie ein ähnliches Projekt?",
    ctaDesc: "Kontaktieren Sie uns und lassen Sie uns über Ihr Projekt sprechen.",
    ctaBtn: "Kontaktieren Sie uns",
    website: "Webseite",
  },
  it: {
    back: "Torna al portfolio",
    client: "Cliente",
    category: "Categoria",
    challenge: "Sfida",
    solution: "La nostra soluzione",
    features: "Funzionalità",
    tech: "Tecnologie",
    results: "Risultati",
    cta: "Vuoi un progetto simile?",
    ctaDesc: "Contattaci e discutiamo del tuo progetto.",
    ctaBtn: "Contattaci",
    website: "Sito web",
  },
};

const featureIcons = [Globe, Smartphone, Search, Zap, Code2, ShoppingCart];

const BncPortfolioContent = ({
  project,
  lang,
  l,
}: {
  project: PortfolioProjectData;
  lang: Lang;
  l: (typeof labels)["sr"];
}) => {
  const sections = getBncShopArticle(lang);
  const [intro, ...restSections] = sections;
  const resultSection = restSections[restSections.length - 1];
  const contentSections = restSections.slice(0, -1);
  const userTypesIndex = contentSections.findIndex((section) =>
    section.paragraphs.some((p) => p.toLowerCase().includes("b2b") || p.toLowerCase().includes("krajnji"))
  );

  return (
    <>
      <section className="pb-12">
        <div className="container mx-auto px-6">
          <div className="grid w-full gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{l.client}</span>
              <p className="mt-1 font-semibold">{project.client[lang]}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{l.category}</span>
              <p className="mt-1 font-semibold">{project.category[lang]}</p>
            </div>
            {project.liveUrl && (
              <div className="rounded-xl border border-border bg-card p-5">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{l.website}</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                >
                  {project.liveUrl.replace(/^https?:\/\//, "")}
                  <Globe className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {intro?.paragraphs[0] && (
        <section className="pb-12">
          <div className="container mx-auto px-6">
            <motion.div
              {...fadeUp}
              className="rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-10"
            >
              <p className="text-lg leading-relaxed text-foreground md:text-xl">{intro.paragraphs[0]}</p>
            </motion.div>
          </div>
        </section>
      )}

      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="grid w-full gap-8 lg:grid-cols-2">
            <motion.div {...fadeUp} className="rounded-2xl border border-border bg-card p-8">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <Shield className="h-5 w-5 text-primary" />
                {l.challenge}
              </h2>
              <p className="leading-relaxed text-muted-foreground">{project.challenge[lang]}</p>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-primary/20 bg-primary/5 p-8"
            >
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <Zap className="h-5 w-5 text-primary" />
                {l.solution}
              </h2>
              <p className="leading-relaxed text-muted-foreground">{project.solution[lang]}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {intro && intro.paragraphs.length > 1 && (
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="w-full space-y-4">
              {intro.paragraphs.slice(1).map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {contentSections.map((section, index) => {
        const isUserTypes = index === userTypesIndex;
        const isAlt = index % 2 === 1;

        if (isUserTypes && section.paragraphs.length > 1) {
          const [lead, ...items] = section.paragraphs;
          const closing = items.length > 3 ? items[items.length - 1] : undefined;
          const featureItems = closing ? items.slice(0, -1) : items;

          return (
            <section key={section.heading} className={isAlt ? "bg-secondary/30 py-20" : "py-20"}>
              <div className="container mx-auto px-6">
                <motion.div {...fadeUp} className="mb-10">
                  {section.heading && (
                    <h2 className="mb-4 text-2xl font-bold md:text-3xl">{section.heading}</h2>
                  )}
                  <p className="text-lg leading-relaxed text-muted-foreground">{lead}</p>
                </motion.div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featureItems.map((item, itemIndex) => {
                    const Icon = featureIcons[itemIndex % featureIcons.length];
                    return (
                      <motion.div
                        key={item}
                        {...fadeUp}
                        transition={{ delay: itemIndex * 0.05 }}
                        className="rounded-xl border border-border bg-card p-5"
                      >
                        <Icon className="mb-3 h-5 w-5 text-primary" />
                        <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                      </motion.div>
                    );
                  })}
                </div>
                {closing && (
                  <motion.p {...fadeUp} className="mt-8 text-lg leading-relaxed text-muted-foreground">
                    {closing}
                  </motion.p>
                )}
              </div>
            </section>
          );
        }

        return (
          <section key={section.heading ?? index} className={isAlt ? "bg-secondary/30 py-16" : "pb-16 pt-4"}>
            <div className="container mx-auto px-6">
              <motion.div
                {...fadeUp}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-border bg-card p-8 md:p-10"
              >
                {section.heading && (
                  <h2 className="mb-6 text-2xl font-bold md:text-3xl">{section.heading}</h2>
                )}
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">{l.features}</h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.features[lang].map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <motion.div
                  key={feature}
                  {...fadeUp}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <Icon className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{feature}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">{l.tech}</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {project.technologies.map((technology, index) => (
              <motion.span
                key={technology}
                {...fadeUp}
                transition={{ delay: index * 0.05 }}
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold"
              >
                {technology}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">{l.results}</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-3">
            {project.results[lang].map((result, index) => (
              <motion.div
                key={result}
                {...fadeUp}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-primary" />
                <p className="font-bold">{result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {resultSection && (
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <motion.div
              {...fadeUp}
              className="rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-12"
            >
              {resultSection.heading && (
                <h2 className="mb-6 text-2xl font-bold md:text-3xl">{resultSection.heading}</h2>
              )}
              <div className="space-y-4">
                {resultSection.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
};

const GalleryCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="pb-16">
      <div className="container mx-auto px-6">
        <motion.div {...fadeUp} className="relative">
          <div ref={emblaRef} className="overflow-hidden rounded-xl">
            <div className="flex">
              {images.map((image, index) => (
                <div
                  key={image}
                  className="mr-4 min-w-0 flex-[0_0_48%] last:mr-0 max-md:flex-[0_0_85%]"
                >
                  <div className="overflow-hidden rounded-xl border border-border shadow-md">
                    <img
                      src={image}
                      alt={`${title} - ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 85vw, 48vw"
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous project image"
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 shadow-md transition-colors hover:bg-background"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next project image"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 shadow-md transition-colors hover:bg-background"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-4 flex justify-center gap-2">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to project image ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  index === selectedIndex ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const lang = (language as Lang) || "sr";
  const l = labels[lang] ?? labels.sr;

  const project = portfolioProjects.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) {
    return <Navigate to="/usluge/izrada-web-stranica#portfolio" replace />;
  }

  const seoTitle = `${project.title} | ${project.category[lang]} | Wizionar`;
  const seoDescription = project.description[lang];
  const projectPath = `/portfolio/${project.slug}`;
  const isArticleLayout = project.layout === "article";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={[project.category[lang], ...project.technologies]}
        schema={[
          createCreativeWorkSchema({
            language: lang,
            name: project.title,
            description: seoDescription,
            path: projectPath,
            keywords: [project.category[lang], ...project.technologies],
          }),
          createWebPageSchema({
            language: lang,
            path: projectPath,
            title: seoTitle,
            description: seoDescription,
          }),
          createBreadcrumbSchema(lang, [
            { name: getSeoLabel(lang, "home"), path: SEO_PATHS.home },
            { name: getSeoLabel(lang, "services"), path: SEO_PATHS.usluge },
            { name: getSeoLabel(lang, "webDevelopment"), path: SEO_PATHS.webDevelopment },
            { name: getSeoLabel(lang, "portfolio"), path: SEO_PATHS.webDevelopment },
            { name: project.title, path: projectPath },
          ]),
        ]}
      />
      <WizionarHeader />

      <section className="pb-12 pt-28">
        <div className="container mx-auto px-6">
          <LocalizedLink
            to="/usluge/izrada-web-stranica#portfolio"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {l.back}
          </LocalizedLink>

          <motion.div {...fadeUp}>
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {project.category[lang]}
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-bold md:text-5xl">{project.title}</h1>
            <p className="w-full text-lg leading-relaxed text-muted-foreground">
              {project.description[lang]}
            </p>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-primary hover:underline"
              >
                {project.liveUrl.replace(/^https?:\/\//, "")}
                <Globe className="h-4 w-4" />
              </a>
            )}
          </motion.div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            {...fadeUp}
            className="overflow-hidden rounded-2xl border border-border shadow-lg"
          >
            <img
              src={project.image}
              alt={project.title}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              className="h-auto w-full"
            />
          </motion.div>
        </div>
      </section>

      {isArticleLayout ? (
        <BncPortfolioContent project={project} lang={lang} l={l} />
      ) : (
        <>
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="grid w-full gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{l.client}</span>
              <p className="mt-1 font-semibold">{project.client[lang]}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                {l.category}
              </span>
              <p className="mt-1 font-semibold">{project.category[lang]}</p>
            </div>
          </div>
        </div>
      </section>

      {project.gallery.length > 1 && <GalleryCarousel images={project.gallery} title={project.title} />}

      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid max-w-5xl gap-8 md:grid-cols-2">
            <motion.div {...fadeUp} className="rounded-2xl border border-border bg-card p-8">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <Shield className="h-5 w-5 text-primary" />
                {l.challenge}
              </h2>
              <p className="leading-relaxed text-muted-foreground">{project.challenge[lang]}</p>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-primary/20 bg-primary/5 p-8"
            >
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <Zap className="h-5 w-5 text-primary" />
                {l.solution}
              </h2>
              <p className="leading-relaxed text-muted-foreground">{project.solution[lang]}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">{l.features}</h2>
          </motion.div>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.features[lang].map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];

              return (
                <motion.div
                  key={feature}
                  {...fadeUp}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <Icon className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{feature}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">{l.tech}</h2>
          </motion.div>
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
            {project.technologies.map((technology, index) => (
              <motion.span
                key={technology}
                {...fadeUp}
                transition={{ delay: index * 0.05 }}
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold"
              >
                {technology}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">{l.results}</h2>
          </motion.div>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {project.results[lang].map((result, index) => (
              <motion.div
                key={result}
                {...fadeUp}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-primary" />
                <p className="font-bold">{result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
        </>
      )}

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">{l.cta}</h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">{l.ctaDesc}</p>
            <a
              href="mailto:info@wizionar.com"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
            >
              {l.ctaBtn}
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </a>
          </motion.div>
        </div>
      </section>

      <WizionarFooter />
    </div>
  );
};

export default ProjectDetail;
