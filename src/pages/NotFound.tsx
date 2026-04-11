import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import LocalizedLink from "@/components/LocalizedLink";
import SEOHead from "@/components/wizionar/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

const copy = {
  sr: {
    title: "Stranica nije pronađena | Wizionar",
    heading: "404",
    text: "Tražena stranica nije pronađena.",
    link: "Povratak na početnu",
  },
  en: {
    title: "Page not found | Wizionar",
    heading: "404",
    text: "The page you requested could not be found.",
    link: "Return to home",
  },
  de: {
    title: "Seite nicht gefunden | Wizionar",
    heading: "404",
    text: "Die angeforderte Seite wurde nicht gefunden.",
    link: "Zur Startseite",
  },
  it: {
    title: "Pagina non trovata | Wizionar",
    heading: "404",
    text: "La pagina richiesta non è stata trovata.",
    link: "Torna alla home",
  },
} as const;

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const t = copy[language];

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SEOHead
        title={t.title}
        description={t.text}
        noIndex
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t.heading}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t.text}</p>
        <LocalizedLink to="/" className="text-primary underline hover:text-primary/90">
          {t.link}
        </LocalizedLink>
      </div>
    </div>
  );
};

export default NotFound;
