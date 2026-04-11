import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildLangPath, stripAllLangPrefixes } from "@/lib/localized-paths";
import { BASE_URL, LANGUAGE_SEO, SUPPORTED_LANGUAGES } from "@/lib/seo";

const HreflangTags = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    document.querySelectorAll("link[hreflang]").forEach((el) => el.remove());

    const basePath = stripAllLangPrefixes(location.pathname);

    SUPPORTED_LANGUAGES.forEach((lang) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = LANGUAGE_SEO[lang].hreflang;
      link.href = `${BASE_URL}${buildLangPath(basePath, lang)}`;
      document.head.appendChild(link);
    });

    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.hreflang = "x-default";
    xDefault.href = `${BASE_URL}${basePath}`;
    document.head.appendChild(xDefault);

    document.documentElement.lang = LANGUAGE_SEO[language].htmlLang;

    return () => {
      document.querySelectorAll("link[hreflang]").forEach((el) => el.remove());
    };
  }, [language, location.pathname]);

  return null;
};

export default HreflangTags;
