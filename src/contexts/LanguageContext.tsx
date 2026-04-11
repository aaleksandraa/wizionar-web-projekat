import { createContext, useCallback, useContext, useEffect, useMemo, useState, type Context, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { translations, Language, Translations } from "@/lib/translations";
import {
  detectLanguageFromPathname,
  localizePath,
  normalizeLocalizedPathname,
} from "@/lib/localized-paths";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const globalLanguageContext = globalThis as typeof globalThis & {
  __wizionarLanguageContext__?: Context<LanguageContextType | undefined>;
};

const LanguageContext =
  globalLanguageContext.__wizionarLanguageContext__ ??
  createContext<LanguageContextType | undefined>(undefined);

globalLanguageContext.__wizionarLanguageContext__ = LanguageContext;

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const urlLanguage = detectLanguageFromPathname(location.pathname);
  const [language, setLanguageState] = useState<Language>(urlLanguage);

  useEffect(() => {
    setLanguageState(urlLanguage);
  }, [urlLanguage]);

  useEffect(() => {
    const normalizedPathname = normalizeLocalizedPathname(location.pathname);

    if (normalizedPathname !== location.pathname) {
      navigate(`${normalizedPathname}${location.search}${location.hash}`, { replace: true });
    }
  }, [location.hash, location.pathname, location.search, navigate]);

  const setLanguage = useCallback((newLang: Language) => {
    const newPath = localizePath(`${location.pathname}${location.search}${location.hash}`, newLang);
    navigate(newPath, { replace: true });
    setLanguageState(newLang);
  }, [location.hash, location.pathname, location.search, navigate]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
